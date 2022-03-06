/**
 * @module Canvas
 */

 import CanvasStore from './CanvasStore';

 /**
  * Class for Canvas abstraction
  */
 class Canvas {
    constructor(w, h, name, parent) {
        this.canvas = this.create(w, h, parent, name);
        this.id = Object.keys(CanvasStore.canvasStore).length;
        this.name = name;
    }

    /**
     * 
     * @param {number} w Width in pixels
     * @param {number} h Height in pixels
     * @param {Element} parent DOM element to contain canvas element
     * @param {string} name name/id value for dom element
     */
    create(w, h, parent, name) {
        // create canvas if there needs to be a new one
        let canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.id = name;
        if (parent) {
            parent.appendChild(canvas);
        }
        else {
            let body = document.querySelector('body');
            body.appendChild(canvas);
        }

        return canvas;
    }

    getCanvasElement() {
        return this.canvas;
    }

    getCanvasContext() {
        return this.canvas.getContext('2d');
    }
}

export default Canvas;