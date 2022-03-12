// @ts-check
import MapLayer from './MapLayer'
import Tileset from "../../Tileset"
import GameObject from '../../GameObjects/GameObject'
import GameMap from '../GameMap';
import Tile from '../../Tile';

interface ObjectLayerJSON {
	name: string;
	type: string;
	width: number;
	height: number;
	objects: any[];
}

interface Tilesets {
	[key: string]: {
		tileSet: Tileset;
		firstgid: number;
	}
}

class ObjectLayer extends MapLayer {
	tilesets: Tilesets;
	objects: any;
	initializedObjects: any[];

	/**
	 * @param  {Object} layer
	 * @param {GameMap} map
	 * @param  {Object} tilesets
	 * @param {Tileset} tilesets.tileSet
	 * @param {number} tilesets.firstgid
	 */
	constructor(layer: ObjectLayerJSON, map: GameMap, tilesets: Tilesets) {
		super(layer, map);
		this.tilesets = tilesets;
		this._map = map;
		this.objects = layer.objects;
		this.initializedObjects = [];
		let player = this.objects.find(o => o.name === 'Player');
	}

	init() {

	}

	renderNew() {

	}

	/**
	 * @param {number} localTileId
	 * @return  {Tileset} Tileset for gid
	 */
	getTileset(localTileId) {
		var layer = this;
		let tilesetKeys = Object.keys(this.tilesets);
		let ts = tilesetKeys.find((k) => { // cache this
			return localTileId >= this.tilesets[k].firstgid && localTileId < this.tilesets[k].firstgid  + this.tilesets[k].tileSet._tileCount ;
		});
		let tilesetElement = this.tilesets[ts];
		let tileset = tilesetElement.tileSet;
		if (!ts) {
			throw new Error("Tileset not found for gid: " + localTileId + " on map: " + this._map.name);
		}
		return tileset;
	}

	render(ctx: CanvasRenderingContext2D, time) {
		this.objects.forEach(obj => {
			if(obj.visible && obj.gid && this.tilesets) {
				let ts = this.getTileset(obj.gid);
				if(ts) {
					let destination_x = +obj.x;
					let destination_y = +obj.y;
					let source = ts.getTileCoords(obj.gid - this.tilesets[ts._name].firstgid);
					ctx.drawImage(
						ts.getTilesetImage(), 
						source.x,
						source.y,
						ts.getTileWidth(),
						ts.getTileHeight(),
						destination_x, 
						destination_y,
						ts.getTileWidth(),
						ts.getTileHeight()
					);
				}
			}
		});
    }
}

export default ObjectLayer;