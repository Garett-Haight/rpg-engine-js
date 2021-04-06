import MapLayer from './MapLayer'

class ObjectLayer extends MapLayer {
	constructor(layer, tilesets) {
		super(layer);
		this._tilesets = tilesets;
		this.objects = layer.objects;
		this.initializedObjects = [];
	}

	init() {

	}

	render(ctx, time) {
		this.objects.forEach(obj => {
			if(obj.visible && obj.gid) {
				let ts = this._tilesets.find((ts) => { // cache this
					return ts._firstgid[this.layer._mapId] <= this._map.id && ts._firstgid[this.layer._mapId] + ts._tileCount >= this._map.id;
				});
				if(ts) {
					let destination_x = obj.properties.find(p => p.name === 'destination_x').value;
					let destination_y = obj.properties.find(p => p.name === 'destination_y').value;
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