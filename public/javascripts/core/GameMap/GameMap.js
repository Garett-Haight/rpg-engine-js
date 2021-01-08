import { Globals, Config } from '../ConfigMgr'
import Player from "../../rpg/Player"
import MapStore from '../MapStore'
import MapService from '../services/MapService'
import MapLayer from './Layers/MapLayer'
import TileLayer from './Layers/TileLayer'
import ObjectLayer from './Layers/ObjectLayer'
import CollisionLayer from './Layers/CollisionLayer'
import EventLayer from './Layers/EventLayer'
import TilesetStore from "../TilesetStore"
import Tileset from "../Tileset"
import Rectangle from '../primitives/Rectangle'

export default class GameMap {
	constructor(map) {
		this.loaded = false;
		this.name = map.name;
		this.children = [];
		this.layers = [];
		this.map = map;
		this._tilesets = [];
		this.parseTilesets(); // promise on completion, since they may rely on image downloads
		this.parseLayers();
		//this.getMap(map);
		this.selection = {
			x: null,
			y: null
		};
		this.loaded = true;
	}

	getMap(mapId) {
		this.loaded = false;
        this.collisions = null;
        this.events = null;

		// check if map has already been loaded to mapList
		return MapStore.get(fn)
		.then((map) => {
			this.id = map.id;
			this.map = map;
			this.parseTilesets();
			this.parseLayers();
		});
	}

	parseLayers() {
		this.map.layers.forEach(layer => {
			if(layer.type.toLowerCase() == 'tilelayer') {
				this.layers.push(new TileLayer(layer, this._tilesets, this.map));
			}
			else if(layer.type.toLowerCase() == 'objectgroup') {
				this.layers.push(new ObjectLayer(layer, this._tilesets));
				if (layer.name.toLowerCase() === 'collisions') {
					let collisions = new CollisionLayer(layer);
					this.layers.push(collisions);
				}
				else if (layer.name.toLowerCase() == 'events') {
					let events = new EventLayer(layer.objects);
					this.layers.push(events);
				}
			}
		});
		console.log(this.layers);
	}

	parseTilesets() {
		for(let tileset of this.map.tilesets) {
			var mapTileset;
			mapTileset = new Tileset(tileset, this.map.id);
			if (!TilesetStore.exists(mapTileset)) {		
				TilesetStore.add(mapTileset);
			}
			else {
				mapTileset = TilesetStore.get(tileset.name);
			}
			this._tilesets.push(mapTileset);
		}
	}

	drawEvents(ctx) {
		ctx.clearRect(0,0, Globals.MAP_WIDTH * Globals.TILE_WIDTH, Globals.MAP_HEIGHT * Globals.TILE_HEIGHT);
		if (this.events.length > 0) {
			for(let e of this.events) {
				if (e.visible) {
					ctx.fillRect(e.x, e.y - Globals.TILE_HEIGHT, Globals.TILE_WIDTH, Globals.TILE_HEIGHT);
				}
			}
		}
	}

	// Entities are players, mobs, and NPCs
	drawEntities (ctx, time) {
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

	}

	drawHighlight(ctx, x, y) {
		let highlight = new Rectangle(x, y, Globals.TILE_WIDTH, Globals.TILE_HEIGHT);
	}

	render(ctx, time) {
		//this.drawMap(ctx, time);
		//this.drawHighlight(ctx);
		this.layers.forEach((layer) => {
			if (typeof layer.render == 'function') {
				layer.render(ctx, time);
			}
		});
	}
}