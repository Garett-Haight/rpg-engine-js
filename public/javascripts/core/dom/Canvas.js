/**
 * @module Canvas
 */

 /**
  * Class for Canvas abstraction
  */
 class Canvas {
    constructor() {
        this.document = window.document;
        this.window = window;
    }

    /**
     * 
     * @param {number} w Width in pixels
     * @param {number} h Height in pixels
     * @param {Element} parent DOM element to contain canvas element
     */
    create(w, h, parent) {
        // create canvas if there needs to be a new one
        let canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;

        if (parent) {
            parent.appendChild(canvas);
        }
        else {
            let body = document.querySelector('body');
            body.appendChild(canvas);
        }

        return canvas;
    }
}

export default Canvas;