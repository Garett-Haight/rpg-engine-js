import Globals from './Globals'
import Player from "./Player";
import MapStore from './MapStore'
import MapService from './services/MapService'
import TilesetStore from "./TilesetStore"
import Tileset from "./Tileset"
import Config from "./Config"
import _ from "lodash"

class MapLayer {
	constructor(layer) {
		this.name = layer.name;
		this.width = layer.width;
		this.height = layer.height;
	}
}

class TileLayer extends MapLayer {
	constructor(layer) {
		super(layer);
		this.tiles = layer.data;
	}


}

class ObjectLayer extends MapLayer {
	constructor(layer) {
		super(layer);
		this.objects = layer.objects;
	}
}

export default class GameMap {
	constructor(map, drawMap=false, mapService) {
		this.loaded = false;
		this.mapService = mapService;
		this.layers = [];
		this.entityLayer = null;
		this.eventLayer = null;
		this.mapName = map;
		this.getMap(map, drawMap);

		this.drawMap = (canvas) => {
			var map = this.map;
			var ctx = canvas.getContext("2d");
			// Clear previous render
			ctx.clearRect(0,0, Globals.MAP_WIDTH * Globals.TILE_WIDTH, Globals.MAP_HEIGHT * Globals.TILE_HEIGHT);
	
			 this.layers.forEach((layer) => {
				if (layer instanceof TileLayer) {	
					let tiles = layer.tiles;									
					for(var i = 0; i < layer.height; i++) {
						for(var j = 0; j < layer.width; j++) {	
							let tileset = null;
							let id = tiles[(j * map.width) + i];
							// which tileset in the map does this belong to?
							let ts = this.map.tilesets.find(tileset => {
								return  id >= tileset.firstgid && id < tileset.tilecount + tileset.firstgid - 1;
							});
							if (ts) {
								let destination_x = i * ts.tilewidth;
								let destination_y = j * ts.tileheight;
								tileset = TilesetStore.get(ts.name);
								if (tileset) {
									let source = tileset.getTileCoords(id - ts.firstgid);
									ctx.drawImage(
										tileset.tilesetImage, 
										source.x,
										source.y,
										tileset.tileWidth,
										tileset.tileHeight,
										destination_x, 
										destination_y,
										ts.tilewidth,
										ts.tileheight
									);
								}
							}
							else {
								// throw error
							}
						}
					}
				}
				else if (layer instanceof ObjectLayer) {
					if (layer.name.toLowerCase() == 'entities') {
						if(this.entityLayer == null) {
							this.entityLayer = layer;
						}
						this.entityLayer.objects.forEach((obj) => {
							if (obj.type == 'player_start' && (Player.pos_x == null || Player.pos_y == null)) {
								Player.setPosition(obj.x, obj.y);
							}
						});
						if (Player.pos_x !== null && Player.pos_y !== null) {
							Player.render(ctx);
						}
					}
				}
			 });
			 // render collisions for debugging
			 if (this.collisions !== null && Config.renderCollisions === true) {
				ctx.fillStyle = "rgba(255, 240, 40, 0.5)";
				this.collisions.objects.forEach(obj => {
					ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
				});
			}
		}
	}

	getMap(mapId, drawMap) {

        // Clear current maps
        this.map = null;
        this.collisions = null;
        this.events = null;

		// check if map has already been loaded to mapList
		return this.mapService.getMap('map' + mapId + '_new.json')
		.then((response) => {
			this.mapName = mapId;
            if(!MapStore.exists(response.data)) {
				this.map = response.data;
				this.parseLayers();
				this.parseTilesets();
				MapStore.add(this);
				this.loaded = true;
            }
		});
	}

	parseLayers() {
		this.map.layers.forEach(layer => {
			if(layer.type == 'tilelayer') {
				this.layers.push(new TileLayer(layer));
			}
			else if(layer.type == 'objectgroup') {
				let oLayer = new ObjectLayer(layer);
				this.layers.push(oLayer);
				if (layer.name.toLowerCase() === 'collisions') {
					this.collisions = oLayer;
				}
			}
		});
	}

	parseTilesets() {
		for(let tileset of this.map.tilesets) {
			var mapTileset;
			mapTileset = new Tileset(tileset);
			if (!TilesetStore.exists(mapTileset)) {		
				TilesetStore.add(mapTileset);
			}
			else {
				mapTileset = TilesetStore.get(tileset.name);
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

	getTilesets() {
		var tilesets = [];
		for(let tileset of this.map.tilesets) {
			var mapTileset = new Tileset(tileset);
			if (!TilesetStore.exists(mapTileset)) {		
				TilesetStore.add(mapTileset);
			}
		}
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
}