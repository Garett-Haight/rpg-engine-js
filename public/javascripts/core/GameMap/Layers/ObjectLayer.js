import MapLayer from './MapLayer'

class ObjectLayer extends MapLayer {
	constructor(layer, tilesets) {
		super(layer);
		this.tilesets = tilesets;
		this.objects = layer.objects;
	}

	render(ctx, time) {

        // this.objects.forEach(obj => {
		// 	obj.render(ctx, time);
		// });
		this.objects.forEach(obj => {
			if(obj.visible && obj.gid) {
				let ts = this._tilesets.find((ts) => { // cache this
					return ts._firstgid[layer._mapId] <= localTileId && ts._firstgid[layer._mapId] + ts._tileCount >= localTileId;
				});
			}
			if(ts) {
				let destination_x = obj.properties.find(p => p.name === 'destination_x').value;
				let destination_y = obj.properties.find(p => p.name === 'destination_y').value;
				let source = ts.getTileCoords(tileId - ts._firstgid[this._map.id]);
			}
		});

		for (let layer of map.layers) {		
			//ctx.clearRect(0,0, Globals.MAP_WIDTH * Globals.TILE_WIDTH, Globals.MAP_HEIGHT * Globals.TILE_HEIGHT);
			for (let e of layer.objects) {
				// Tiled positions objects at bottom left instead of top left
				e.y = e.y - Globals.TILE_HEIGHT;
			}
		}
    }
}

export default ObjectLayer;