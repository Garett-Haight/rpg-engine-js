// Viewport >> Scene >> Children
import Render from './Renderer'

export default class Scene {
    constructor() {
        // array of renderable game objects
        this.children = [];
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