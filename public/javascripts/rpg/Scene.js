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

    render(ctx) {
        this.children.forEach(child => child.render(ctx));
    }
}