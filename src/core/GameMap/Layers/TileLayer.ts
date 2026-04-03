// @ts-check
import MapLayer from './MapLayer'
import Tile from '../../Tile'
import ConfigMgr from '../../ConfigMgr'
import GameMap from '../GameMap';
import Tileset from '../../Tileset';

class TileLayer extends MapLayer {
	id: any;
	mapId: any;
	tilesets: any;
	tilesRaw: any;
	tiles: any[];
	x: any;
	y: any;
	height: any;
	width: any;
	name: any;
	opacity: any;
	visible: any;
	
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
			this.id = layer.id;
			this.map = map;
			this.mapId = map.name;
			this.tilesets = tilesets;
			this.tilesRaw = layer.data;
			this.tiles = [];
			this.x = layer.x;
			this.y = layer.y;
			this.height = layer.height;
			this.width = layer.width;
			this.name = layer.name;
			this.opacity = layer.opacity;
			this.visible = layer.visible;
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
		let tilesetKeys = Object.keys(this.tilesets);
		let ts = tilesetKeys.find((k) => { // cache this
			return localTileId >= this.tilesets[k].firstgid && localTileId < this.tilesets[k].firstgid  + this.tilesets[k].tileSet._tileCount ;
		});
		let tilesetElement = this.tilesets[ts];
		let tileset = tilesetElement.tileSet;
		if (!ts) {
			throw new Error("Tileset not found for gid: " + localTileId + " on map: " + this.mapId);
		}
		return tileset;
	}

	getTilesets() {
		// getTileset above should use this method to reduce number of tilesets searched
	}

	render(ctx: CanvasRenderingContext2D, time: DOMHighResTimeStamp) { // should probably make a renderer object instead of duping really similar code between game objects
		this.tilesRaw.forEach((tileId: number, idx: number) => {
			if (tileId > 0) { // empty space
				let tileset = this.getTileset(tileId);
				if (tileset) {
					let ts = tileset;
					let destination_x = ((idx % this.map.rawMap.width) * ts._tileWidth);
					let destination_y = ts._tileHeight * Math.floor(idx / this.map.rawMap.width);
					let source = ts.getTileCoords(tileId - ts.getLocalfirstGid(this.map));
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