// Viewport >> Scene >> Children
import Render from './Renderer'

export default class Scene {
    constructor(children) {
        // array of renderable game objects
        this.children = children;
        //TODO: How do I determine the render order of scene elements?

    }

    // add game object to scene
    add(obj) {
        
    }

    // remove game object from scene
    remove(id) {
        
    }

    handleEvent(eventName, eventObject) {
        this.children.forEach((child) => {
            if (typeof child.handleEvent === 'function') {
                child.handleEvent(eventName, eventObject);
            }
        });
    }

    render(ctx, time) {
        this.children.forEach((child) => {
            if (typeof child.render === 'function') {
                child.render(ctx, time);
            }
        });
    }
}