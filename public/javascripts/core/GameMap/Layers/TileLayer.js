import MapLayer from './MapLayer'
import TilesetStore from '../../TilesetStore'
import Tile from '../../Tile'
import { Globals } from '../../ConfigMgr'
import GameMap from '../GameMap';
import Tileset from '../../Tileset';

class TileLayer extends MapLayer {
	
	/**
	 * @param  {String} layer
	 * @param  {[Tileset]} tilesets
	 * @param  {GameMap} map
	 */
	constructor(layer, map, tilesets) {
		if(layer.type.toLowerCase() === 'tilelayer') {
			super(layer);
			this._id = layer.id;
			this._map = map;
			this._mapId = map.id;
			this._tilesets = tilesets;
			this._tilesRaw = layer.data;
			this._firstGidMap = [];
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

	getTileset(localTileId) {
		var layer = this;
		return this._tilesets.find((ts) => { // cache this
			return localTileId >= ts.firstgid && localTileId < ts.firstgid + ts.tileSet._tileCount;
		});
	}

	getTilesets() {

	}

	render(ctx, time) { // should probably make a renderer object instead of duping really similar code between game objects
		this._tilesRaw.forEach((tileId, idx) => {
			let tileset = this.getTileset(tileId);
			if (tileset) {
				let ts = tileset.tileSet;
				let destination_x = ((idx % this._map.map.width) * ts._tileWidth);
				let destination_y = ts._tileHeight * Math.floor(idx / this._map.map.width);
				let source = ts.getTileCoords(tileId - tileset.firstgid);
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
		});
		// this._tiles.forEach((tile) => {
		// 	tile.render(ctx);
		// });
	}
}

export default TileLayer;