// @ts-check
import MapLayer from './MapLayer'
import Tile from '../../Tile'
import ConfigMgr from '../../ConfigMgr'
import GameMap from '../GameMap';
import Tileset from '../../Tileset';

class TileLayer extends MapLayer {
	_id: any;
	_mapId: any;
	_tilesets: any;
	_tilesRaw: any;
	_tiles: any[];
	_x: any;
	_y: any;
	_height: any;
	_width: any;
	_name: any;
	_opacity: any;
	_visible: any;
	
	/**
	 * @param  {Object} layer
	 * @param  {GameMap} map
	 * @param  {Object} tilesets
	 * @param {Tileset} tilesets.tileSet
	 * @param {number} tilesets.firstgid
	 */
	constructor(layer, map, tilesets) {
		if(layer.type.toLowerCase() === 'tilelayer') {
			super(layer, map);
			this._id = layer.id;
			this._map = map;
			this._mapId = map.name;
			this._tilesets = tilesets;
			this._tilesRaw = layer.data;
			this._tiles = [];
			this._x = layer.x;
			this._y = layer.y;
			this._height = layer.height;
			this._width = layer.width;
			this._name = layer.name;
			this._opacity = layer.opacity;
			this._visible = layer.visible;
		}
		else {
			throw "Layer is not of type: TileLayer";
		}
	}
	// this should go in the tileset initialization
	parseTiles() {
		// this._tilesRaw.forEach((tile, idx) => {
		// 	this._tiles.push(new Tile(
		// 		this,
		// 		Globas.TILE_WIDTH * idx,
		// 		Globals.TILE_HEIGHT * ()
		// 	));
		// });
	}

	/**
	 * 
	 * @param {number} localTileId 
	 * @returns {Tileset}
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
			throw new Error("Tileset not found for gid: " + localTileId + " on map: " + this._mapId);
		}
		return tileset;
	}

	getTilesets() {
		// getTileset above should use this method to reduce number of tilesets searched
	}

	render(time, ctx) { // should probably make a renderer object instead of duping really similar code between game objects
		this._tilesRaw.forEach((tileId, idx) => {
			if (tileId > 0) { // empty space
				let tileset = this.getTileset(tileId);
				if (tileset) {
					let ts = tileset;
					let destination_x = ((idx % this._map.rawMap.width) * ts._tileWidth);
					let destination_y = ts._tileHeight * Math.floor(idx / this._map.rawMap.width);
					let source = ts.getTileCoords(tileId - ts.getLocalfirstGid(this._map));
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
		// this._tiles.forEach((tile) => {
		// 	tile.render(ctx);
		// });
	}
}

export default TileLayer;