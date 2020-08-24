import ObjectLayer from './ObjectLayer'

export default class EventLayer extends ObjectLayer {
    constructor(layer) {
        super(layer);
        this.events = layer.objects;
    }

    render(ctx, time) {
        
    }
}