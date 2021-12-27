class MapLayer {
	constructor(layer, map) {
		this.layer = layer;
		this.name = layer.name;
		this.width = layer.width;
		this.height = layer.height;
		// @type {GameMap}
		this._map = map;
    }
    
    render() {
        
    }
}

export default MapLayer;