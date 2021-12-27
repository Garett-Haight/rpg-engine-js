// @ts-check
import MapLayer from './MapLayer'
import Tileset from "../../Tileset"
import GameObject from '../../GameObjects/GameObject'
import GameMap from '../GameMap';

class ObjectLayer extends MapLayer {

	/**
	 * @param  {Object} layer
	 * @param {GameMap} map
	 * @param  {Object} tilesets
	 * @param {Tileset} tilesets.tileSet
	 * @param {number} tilesets.firstgid
	 */
	constructor(layer, map, tilesets) {
		super(layer, map);
		this._tilesets = tilesets;
		this._map = map;
		this.objects = layer.objects;
		this.initializedObjects = [];
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
		let tilesetKeys = Object.keys(this._tilesets);
		let ts = tilesetKeys.find((k) => { // cache this
			return localTileId >= this._tilesets[k].firstgid && localTileId < this._tilesets[k].firstgid  + this._tilesets[k].tileSet._tileCount ;
		});
		let tilesetElement = this._tilesets[ts];
		let tileset = tilesetElement.tileSet;
		if (!ts) {
			throw new Error("Tileset not found for gid: " + localTileId + " on map: " + this._map.name);
		}
		return tileset;
	}

	render(ctx, time) {
		this.objects.forEach(obj => {
			if(obj.visible && obj.gid && this._tilesets) {
				let ts = this.getTileset(obj.gid);
				if(ts) {
					let destination_x = +obj.x;
					let destination_y = +obj.y;
					let source = ts.getTileCoords(obj.gid - ts._firstgid);
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