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

	render() {

	}

	renderNew(ctx, time) {
		this.objects.forEach(obj => {
			if(obj.visible && obj.gid && this._tilesets) {
				let ts = this._tilesets.find((ts) => { // cache this
					let mapId = this._map.name;
					let firstGid = ts._firstgid[mapId];
					return firstGid <= mapId && firstGid + ts._tileCount >= obj.gid;
				});
				if(ts) {
					let destination_x = +obj.properties.find(p => p.name === 'destination_x').value;
					let destination_y = +obj.properties.find(p => p.name === 'destination_y').value;
					let relative_gid = tileId - ts._firstgid[this._map.id];
					let source = ts.getTileCoords(relative_gid);
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