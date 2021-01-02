import Canvas from './Canvas'

class CanvasStore {
    constructor() {
        this.canvasStore = {};
        return this;
    }

    create(parent, width, height) {
        let c = new Canvas(width, height, parent);
        this.canvasStore[Object.keys(this.canvasStore).length] = c;
        return c;
    }

    add(w, h, parent) {
        return Canvas.create(w, h, parent);
    }

    get() {
        // get canvas by ???
    }
}

const CanvasStoreInstance = new CanvasStore();
Object.freeze(CanvasStoreInstance);
export default CanvasStoreInstance;