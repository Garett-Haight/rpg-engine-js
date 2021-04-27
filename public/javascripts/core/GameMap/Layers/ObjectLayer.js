import MapLayer from './MapLayer'
import GameObject from '../../GameObjects/GameObject'

class ObjectLayer extends MapLayer {
	constructor(layer, tilesets, map) {
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

	render(ctx, time) {
		this.objects.forEach(obj => {
			if(obj.visible && obj.gid && this._tilesets) {
				let ts = this._tilesets.find((ts) => { // cache this
					let firstGid = ts.firstgid;
					return ts.firstgid <= obj.gid && obj.gid < firstGid + ts.tileSet._tileCount;
				});
				if(ts) {
					let destination_x = +obj.x;
					let destination_y = +obj.y;
					let source = ts.tileSet.getTileCoords(obj.gid - ts.firstgid);
					ctx.drawImage(
						ts.tileSet.getTilesetImage(), 
						source.x,
						source.y,
						ts.tileSet.getTileWidth(),
						ts.tileSet.getTileHeight(),
						destination_x, 
						destination_y,
						ts.tileSet.getTileWidth(),
						ts.tileSet.getTileHeight()
					);
				}
			}
		});
    }
}

export default ObjectLayer;