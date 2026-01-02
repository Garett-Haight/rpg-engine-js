// type RenderingContext = CanvasRenderingContext2D | WebGLRenderingContext; // TODO: move to export file
export default interface IEvent {
    name: string;
    trigger: string;
    action: Function;
}