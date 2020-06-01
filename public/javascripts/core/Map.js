import { Globals } from './ConfigMgr'
import Player from "../rpg/Player";
import MapStore from './MapStore'
import MapService from './services/MapService'
import TilesetStore from "./TilesetStore"
import Tileset from "./Tileset"
import Config from "../rpg/Config"
import _ from "lodash"
import Rectangle from './primitives/Rectangle';

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

export default class Map {
	constructor(map, drawMap=false, mapService) {
		this.loaded = false;
		this.mapService = mapService;
		this.layers = [];
		this.entityLayer = null;
		this.eventLayer = null;
		this.mapName = map;
		this.getMap(map, drawMap);
		this.selection = {
			x: null, 
			y: null
		};
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
			if(layer.type.toLowerCase() == 'tilelayer') {
				this.layers.push(new TileLayer(layer));
			}
			else if(layer.type.toLowerCase() == 'objectgroup') {
				this.layers.push(new ObjectLayer(layer));
				if (layer.name.toLowerCase() === 'collisions') {
					this.collisions = layer.objects.map((rect) => {
						return new Rectangle(rect.x, rect.y, rect.width, rect.height)
					});
					
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
	parseEvents() {a
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
					}
				}
			}
		}
	}

	drawMap(ctx, time) {
		var map = this.map;
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
									tileset.getTilesetImage(), 
									source.x,
									source.y,
									tileset.getTileWidth(),
									tileset.getTileHeight(),
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
						if (obj.type.toLowerCase() === 'player_start' && Player._builtGraphics == false) {
							Player.setPosition(obj.x, obj.y);
							Player.buildGraphics();
						}
					});
					if (Player.getBounds().getX() !== null && Player.getBounds().getY() !== null) {
						Player.render(ctx, time);
					}
				}
			}
		});
		// render collisions for debugging
		if (this.collisions !== null && Config.renderCollisions === true) {
			ctx.fillStyle = "rgba(255, 240, 40, 0.5)";
			this.collisions.forEach(obj => {
				ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
			});
		}
	}

	registerEvent(eventName, fn) {
		this._events[eventName].push(fn)
	}

	handleEvent(eventName, eventObject) {
		switch(eventName) {
			case 'click':
				this.handleClick(eventName, eventObject);
				break;
		}
	}

	handleClick(eventName, eventObject) {
		//check bounds
		console.log(event);
	}

	drawHighlight(ctx, x, y) {
		let highlight = new Rectangle(x, y, Globals.TILE_WIDTH, Globals.TILE_HEIGHT);

	}

	render(ctx, time) {
		this.drawMap(ctx, time);
		this.drawHighlight(ctx);
	}
}