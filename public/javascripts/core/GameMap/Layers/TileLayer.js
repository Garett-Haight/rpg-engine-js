import MapLayer from './MapLayer'
import Tile from '../../Tile'
import { Globals } from '../../ConfigMgr'

class TileLayer extends MapLayer {
	constructor(layer, tilesets, map) {
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
			// get tilesets

			// if tileset not found, parse tilesets
			this.parseTiles();
		}
		else {
			throw "Layer is not of type: TileLayer";
		}
	}
	// this should go in the tileset initialization
	parseTiles() {
		// this._tilesRaw.forEach((tile, idx) => {
		// 	this._tiles.push(new Tile(
		// 		tile,
		// 		Globas.TILE_WIDTH * idx,
		// 		Globals.TILE_HEIGHT * ()
		// 	));
		// });
	}

	getTileset(localTileId) {
		var layer = this;
		return this._tilesets.find((ts) => { // cache this
			return ts._firstgid[layer._mapId] <= localTileId && ts._firstgid[layer._mapId] + ts._tileCount >= localTileId;
		});
	}

	render(ctx, time) { // should probably make a renderer object instead of duping really similar code between game objects
		this._tilesRaw.forEach((tileId, idx) => {
			let ts = this.getTileset(tileId);
			if (ts) {
				let destination_x = ((idx % this._map.width) * ts._tileWidth);
				let destination_y = ts._tileHeight * Math.floor(idx / this._map.width);
				let source = ts.getTileCoords(tileId - ts._firstgid[this._map.id]);
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

	drawMap(ctx, time) {
		this._tiles.forEach();
		this.layers.forEach((layer) => {
			if (layer instanceof TileLayer) {	
				let tiles = layer.tiles;									
				for(var i = 0; i < layer.height; i++) {
					for(var j = 0; j < layer.width; j++) {	
						let tileset = null;
						let id = tiles[(j * map.width) + i];
						// which tileset in the map does this belong to?
						let ts = this._map.tilesets.find(tileset => {
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
}

export default TileLayer;