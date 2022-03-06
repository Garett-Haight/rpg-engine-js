// @ts-check
import ConfigMgr from '../ConfigMgr'
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
import AnimatedSprite from '../AnimatedSprite'
import Events from '../events/Events'
import MapLayer from './Layers/MapLayer'

export default class GameMap {
	loaded: boolean;
	name: string;
	children: any[];
	layers: MapLayer[];
	rawMap: any;
	_events: {
		string: Events;
	};
	_tilesets: {};
	selection: { x: any; y: any };
	collisions: CollisionLayer;

	/**
	 * @param  {Object} map - map JSON
	 */
	constructor(map) {
		this.loaded = false;
		this.name = map.name;
		this.children = [];
		this.layers = [];
		this.rawMap = map;
		this._events;
		this.collisions;
		this._tilesets = this.parseTilesets(); // promise on completion, since they may rely on image downloads
		this.parseLayers();
		// mouse selection coords
		this.selection = {
			x: null,
			y: null
		};
		this.loaded = true;
	}

	parseLayers() {
		this.rawMap.layers.forEach(layer => {
			if(layer.type.toLowerCase() == 'tilelayer') {
				this.layers.push(new TileLayer(layer, this, this._tilesets));
			}
			else if(layer.type.toLowerCase() === 'objectgroup') {
				if (layer.name.toLowerCase() === 'collisions') {
					let collisions = new CollisionLayer(layer, this);
					this.collisions = collisions;
					this.layers.push(collisions);
				}
				else if (layer.name.toLowerCase() === 'events') {
					let events = new EventLayer(layer, this, this._tilesets);
					this.layers.push(events);
				} else {
					this.layers.push(new ObjectLayer(layer, this, this._tilesets));
				}
			}
		});
		console.log(this.layers);
	}

	/**
	 * @typedef {Object} Tilesets
	 * @property {Tileset} tileset
	 * @property {number} firstgid
	 * @return  {Tilesets | Object} tilesets
	 * 
	 */
	parseTilesets() {
		let tilesets = {};
		if (!this.rawMap.tilesets.length) {
			throw new Error("No tilesets present in map data");
		}
		for(let tileset of this.rawMap.tilesets) {
			var mapTileset;
			if (!TilesetStore.exists(tileset.name)) {		
				mapTileset = new Tileset(tileset);
				TilesetStore.add(mapTileset);
			}
			else {
				mapTileset = TilesetStore.get(tileset.name);
			}
			tilesets[tileset.name] = { tileSet: mapTileset, firstgid: mapTileset._firstgid };
		}
		return tilesets;
	}

	parseAnimations(tiles) {
		let animations = tiles.filter((t) => t.hasOwnProperty("animation"));
		let renderedAnimations = [];
		animations.forEach((a) => {
			let animation = new AnimatedSprite(a, a.id);
			renderedAnimations.push(animation);
		});
		return renderedAnimations;
	}

	registerEvent(eventName, fn) {
		this._events[eventName] = fn;
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
		let highlight = new Rectangle(x, y, ConfigMgr.getGlobal('TILE_WIDTH'), ConfigMgr.getGlobal('TILE_HEIGHT'));
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