// // Viewport >> Scene >> Children
// import Render from './Renderer'
// build renderer interface

export default class Scene {
    children: any[];
    name: any;

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