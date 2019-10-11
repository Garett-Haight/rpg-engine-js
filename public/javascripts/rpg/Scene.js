// Viewport >> Scene >> Children

export default class Scene {
    constructor() {

    }
    // array of renderable game objects
    children = [];

    render(ctx) {
        this.children.forEach(child => child.render(ctx));
    }
}