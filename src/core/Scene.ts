// // Viewport >> Scene >> Children
// import Render from './Renderer'
// build renderer interface

import Transition from "./Transition";
import Event from './events/Event';

 
type RenderingContext = CanvasRenderingContext2D | WebGLRenderingContext; // TODO: move to export file
interface Renderable <E extends Event> {
    render(ctx: RenderingContext, time: DOMHighResTimeStamp) : void;
    handleEvent<E> (eventName: string, eventObject: E); // TODO: Generics reading
}

export default class Scene<Event> implements Renderable<Event> {
    children: Renderable<Event>[];
    name: any;
    transitionIn: Transition;
    transitionOut: Transition;
    constructor(children, name) {
        // array of renderable game objects
        this.children = children;
        this.name = name;
        //TODO: How do I determine the render order of scene elements?
    }

    // add game object to scene
    add(obj) {
        this.children.push(obj);
    }

    // remove game object from scene
    remove(id) {
        
    }

    // replace obj in children array
    replace(name, type) {
        let replaceMe = this.children.find((c) => {
            
        });
    }

    handleEvent<Event>(eventName: string, eventObject: Event) {
        this.children.forEach((child) => {
            if (typeof child.handleEvent === 'function') {
                child.handleEvent(eventName, eventObject);
            }
        });
    }

    render(ctx: RenderingContext, time: DOMHighResTimeStamp) {
        this.children.forEach((child) => {
            if (typeof child.render === 'function') {
                child.render(ctx, time);
            }
        });
    }
}