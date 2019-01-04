import Globals from './Globals'
import Player from "./player";
import MapStore from './MapStore'
import MapService from './services/MapService'
import TilesetStore from "./TilesetStore"
import Tileset from "./Tileset"
import _ from "lodash"

class MapLayer {
	constructor(name) {

	}
}

class TileLayer extends MapLayer {
	constructor(name) {
		super(name);
	}
}

class ObjectLayer extends MapLayer {
	constructor(name) {
		super(name);
	}
}

export default class GameMap {
	constructor(map, drawMap=false, mapService) {
		this.mapService = mapService;
		this.layers = [];
        this.getMap(map, drawMap);
		this.mapName = map;
	}

	getMap(mapId, drawMap) {

        // Clear current maps
        this.map = null;
        this.collisions = null;
        this.events = null;

		// check if map has already been loaded to mapList
		this.mapService.getMap('map' + mapId + '_new.json')
		.then((response) => {
			this.mapName = mapId;
            if(!MapStore.exists(response.data)) {
				// non-cached response returns JSON which needs to be parsed
				//MapStore.add(response.data)
				this.map = response.data;

				this.parseLayers();
				this.parseTilesets();
				MapStore.add(this);
				//this.parseEvents();
				console.log(MapStore);
            }
		});
	}

	parseLayers() {
		this.map.layers.forEach(layer => {
			if(layer.type == 'tilelayer') {
				this.layers.push(new TileLayer(layer));
			}
			else if(layer.type == 'objectgroup') {
				this.layers.push(new ObjectLayer(layer));
			}
		});
	}

	parseTilesets() {
		var tilesets = [];
		for(let tileset of this.map.tilesets) {
			var mapTileset = new Tileset(tileset);
			if (!TilesetStore.exists(mapTileset)) {		
				TilesetStore.add(mapTileset);
			}
		}
	}

	loadMap(mapId, args) { // bit of a misnomer... this seems to be more for teleporting to new maps
		// update mapList with current version of the map
		MapStore.add(Object.assign(Object.create(this), this)); 

		var mapPromise = this.getMap(mapId, true);

		mapPromise.then(() => {
           // var entitiesContainer = document.querySelector('#entities');
           // this.placePlayer(entitiesContainer, args);
		});

	}

	drawMap (container="#map") {
		var map = this.map;
		var tiles = map.layers[0].data;
		var mapElement = document.querySelector(container);
		var ctx = mapElement.getContext("2d");
		// Clear previous render
		ctx.clearRect(0,0, Globals.MAP_WIDTH * Globals.TILE_WIDTH, Globals.MAP_HEIGHT * Globals.TILE_HEIGHT);

		mapElement.width = Globals.MAP_WIDTH * Globals.TILE_WIDTH;
		mapElement.height = Globals.MAP_HEIGHT * Globals.TILE_HEIGHT;
		map.width = Globals.MAP_WIDTH;
		map.height = Globals.MAP_HEIGHT;
		
		for (let i = 0; i < map.height; i++) {
			for(let j = 0; j < map.width; j++) {
				var tileCoords = this.tilesets.getTileCoordsById(tiles[(i*Globals.MAP_WIDTH) + j] + 1);
				var image = this.tilesets.getTilesetImageById(tiles[(i*Globals.MAP_WIDTH) + j] + 1); // gids start at 1 for some reason
				ctx.drawImage(
					image, 
					tileCoords.x, 
					tileCoords.y, 
					Globals.TILE_WIDTH,
					Globals.TILE_HEIGHT,
					j * Globals.TILE_WIDTH, 
					i * Globals.TILE_HEIGHT, 
					Globals.TILE_WIDTH,
					Globals.TILE_HEIGHT);
			}
			this.tilesDrawn = true;
		}
	}

	parseCollisions() {
		var collisions = [];
		for ( let layer of this.map.layers ) {
			if (layer.name == "Collisions") {
				for (let i = 0; i < layer.objects.length; i++) {
					collisions.push(layer.objects[i]);
				}
			}
		}
		this.collisions = collisions;
	}

	getTilesets() {
		var tilesets = [];
		for(let tileset of this.map.tilesets) {
			var mapTileset = new Tileset(tileset);
			if (!TilesetStore.exists(mapTileset)) {		
				TilesetStore.add(mapTileset);
			}
			// This might cause some resource bloating... need to find a way to cache images
			// maybe embed them on the page and provide a dom reference?
			// var isLoaded = !!_.find(tilesets, function(o) {
			// 	return o.name == tileset.name;
			// });
			// if (!isLoaded) {
			// 	tilesets.push(new Tileset({
			// 		name: tileset.name,
			// 		src: tileset.image.split('\\').pop().split('/').pop(), 
			// 		height: tileset.tileheight,
			// 		width: tileset.tilewidth,
			// 		firstgid: tileset.firstgid
			// 	}));
			// }
		}
		console.log(TilesetStore);
	}

	// Events are items, map teleports, etc.
	parseEvents() {
		var events;
		for (let layer of this.map.layers ) {
			if (layer.name == "Events") {
				events = layer.objects;
			}
		}
		this.events = events;
	}

	drawEvents(container=".top") {
		var eventsContainer;
        var mapElement = document.querySelector(container);

        if (!(eventsContainer = document.querySelector('#events'))) {
			eventsContainer = document.createElement("canvas");
			eventsContainer.id = "events";

            eventsContainer.width = Globals.MAP_WIDTH * Globals.TILE_WIDTH;
            eventsContainer.height = Globals.MAP_HEIGHT * Globals.TILE_HEIGHT;

            mapElement.appendChild(eventsContainer);
		}

		var ctx = eventsContainer.getContext("2d");
		ctx.clearRect(0,0, Globals.MAP_WIDTH * Globals.TILE_WIDTH, Globals.MAP_HEIGHT * Globals.TILE_HEIGHT);
        ctx.fillStyle = TILESET[5];

		if (this.events.length > 0) {
			for(let e of this.events) {
				if (e.visible) {
					ctx.fillRect(e.x, e.y - Globals.TILE_HEIGHT, Globals.TILE_WIDTH, Globals.TILE_HEIGHT);
				}
			}
		}
	}

	// Entities are players, mobs, and NPCs
	drawEntities (container=".top") {
		var map = this.map;
		var mapElement = document.querySelector(container);
		for (let layer of map.layers) {
			if (layer.name == "Entities") {
				if (this.tilesDrawn) {
					var entitiesContainer;
					if (!(entitiesContainer = document.querySelector('#entities'))) {
						entitiesContainer = document.createElement('canvas');
						entitiesContainer.id = "entities";

						entitiesContainer.width = Globals.MAP_WIDTH * Globals.TILE_WIDTH;
						entitiesContainer.height = Globals.MAP_HEIGHT * Globals.TILE_HEIGHT;
						mapElement.appendChild(entitiesContainer);

					}

                    var ctx = entitiesContainer.getContext("2d");
                    ctx.clearRect(0,0, Globals.MAP_WIDTH * Globals.TILE_WIDTH, Globals.MAP_HEIGHT * Globals.TILE_HEIGHT);
					
					for (let e of layer.objects) {
						// Tiled positions objects at bottom left instead of top left
						e.y = e.y - Globals.TILE_HEIGHT;
						if (e.name == "Player" && !this.game.player) {
							this.placePlayer(entitiesContainer, {x: e.x, y: e.y});
						}
					}
				}
			}
		}
	}

	placePlayer(container, args) {
        if(!this.game.player) {
            this.game.player = new Player(container, this.game, {x: args.x, y: args.y});
        }
        else {
        	this.game.player.canvas = container;
        	this.game.player.pos_x = args.x;
        	this.game.player.pos_y = args.y;
        	this.game.player.update();
		}
	}

	render() {
        this.drawMap();
        if(!this.collisions) {
            this.parseCollisions();
        }

        // no need to parse events twice
        if (!this.events) {
            this.parseEvents();
        }
        this.drawEvents();
        this.drawEntities();
    }
}