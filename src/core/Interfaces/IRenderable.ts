// type RenderingContext = CanvasRenderingContext2D | WebGLRenderingContext; // TODO: move to export file
export default interface IRenderable <E extends Event> {
    render(ctx: RenderingContext, time: DOMHighResTimeStamp) : void;
    handleEvent<E> (eventName: string, eventObject: E); // TODO: Generics reading
}