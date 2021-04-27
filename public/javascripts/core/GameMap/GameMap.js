import { Globals, Config } from '../ConfigMgr'
import Player from "../../rpg/Player"
import MapStore from '../MapStore'
import MapService from '../services/MapService'
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
				this.layers.push(new TileLayer(layer, this, this._tilesets));
			}
			else if(layer.type.toLowerCase() === 'objectgroup') {
				if (layer.name.toLowerCase() === 'collisions') {
					let collisions = new CollisionLayer(layer);
					this.layers.push(collisions);
				}
				else if (layer.name.toLowerCase() === 'events') {
					let events = new EventLayer(layer, this._tilesets);
					this.layers.push(events);
				} else {
					this.layers.push(new ObjectLayer(layer, this._tilesets, this));
				}
			}
		});
		console.log(this.layers);
	}

	parseTilesets() {
		for(let tileset of this.map.tilesets) {
			var mapTileset;
			if (!TilesetStore.exists(mapTileset)) {		
				mapTileset = new Tileset(tileset);
				TilesetStore.add(mapTileset);
			}
			else {
				mapTileset = TilesetStore.get(tileset.name);
			}
			this._tilesets.push({tileSet: mapTileset, firstgid: tileset.firstgid});
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