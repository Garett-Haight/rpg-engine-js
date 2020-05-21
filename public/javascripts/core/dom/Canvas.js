class Canvas {
    contructor() {
        this.document = window.document;
        this.window = window;
    }

    create(id, w, h, parent) {
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

const CanvasInstance = new Canvas();
Object.freeze(CanvasInstance);
export default CanvasInstance;