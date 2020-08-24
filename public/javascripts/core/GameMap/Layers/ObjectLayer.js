import MapLayer from './MapLayer'

class ObjectLayer extends MapLayer {
	constructor(layer) {
		super(layer);
		this.objects = layer.objects;
	}

	render() {
        
    }
}

export default ObjectLayer;