import ObjectLayer from './ObjectLayer'

export default class EventLayer extends ObjectLayer {
    constructor(layer) {
        super(layer);
        this.events = layer.objects;
        console.log(this.events);
    }

    render(ctx, time) {
        
    }
}