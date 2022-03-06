import ObjectLayer from './ObjectLayer'

export default class EventLayer extends ObjectLayer {
    private events: any[];
    constructor(layer, map, tilesets) {
        super(layer, map, tilesets);
        this.events = layer.objects;
        console.log(this.events);
    }

    render(ctx: CanvasRenderingContext2D, time: number) {
        
    }
}