// @ts-check
import ConfigMgr from '../ConfigMgr'
import Player from "../../rpg/Player"
import MapRepository from '../MapRepository'
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
import IRenderable from '../Interfaces/IRenderable'

interface MapTilesets {
		[key: string]: {
			tileSet:Tileset,
			firstgid:number
		}
	};

export default class GameMap implements IRenderable {
	loaded: boolean;
	name: string;
	children: any[];
	layers: MapLayer[];
	rawMap: any;
	events: {
		string: Events;
	};
	tilesets: MapTilesets;
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
		this.events;
		this.collisions;
		this.tilesets = this.parseTilesets(); // promise on completion, since they may rely on image downloads
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
				this.layers.push(new TileLayer(layer, this, this.tilesets));
			}
			else if(layer.type.toLowerCase() === 'objectgroup') {
				if (layer.name.toLowerCase() === 'collisions') {
					let collisions = new CollisionLayer(layer, this);
					this.collisions = collisions;
					this.layers.push(collisions);
				}
				else if (layer.name.toLowerCase() === 'events') {
					let events = new EventLayer(layer, this, this.tilesets);
					this.layers.push(events);
				} else {
					this.layers.push(new ObjectLayer(layer, this, this.tilesets));
				}
			}
		});
		console.log(this.layers);
	}

	/**
	 * @return  {MapTilesets} tilesets
	 */
	parseTilesets(): MapTilesets {
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
			
			tilesets[tileset.name] = { tileSet: mapTileset, firstgid: tileset.firstgid };
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
		this.events[eventName] = fn;
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

	render(ctx: CanvasRenderingContext2D,time: number) {
		//this.drawMap(time, ctx);
		//this.drawHighlight(ctx);
		this.layers.forEach((layer) => {
			if (typeof layer.render == 'function') {
				layer.render(ctx, time);
			}
		});
	}
}