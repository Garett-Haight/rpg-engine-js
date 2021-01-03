import MapLayer from './MapLayer'

class ObjectLayer extends MapLayer {
	constructor(layer) {
		super(layer);
		this.objects = layer.objects;
	}

	render(ctx, time) {
        this.objects.array.forEach(obj => {
			obj.render(ctx, time);
		});
    }
}

export default ObjectLayer;