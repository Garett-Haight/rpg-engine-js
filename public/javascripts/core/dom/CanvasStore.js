import Canvas from './Canvas'

class CanvasStore {
    constructor() {
        this.canvasStore = {};
        return this;
    }

    create(parent, width, height) {
        if (!this.canvasStore.hasOwnProperty(id)) {
            return Canvas.create(id, width, height, parent);
        }
        else {
            return Canvas.get(id);
            // Canvas.clear(id);
        }
        // make new canvas is one is not in the store
        // reuse canvas if one already exists
    }

    add(id, w, h, parent) {
        return Canvas.create(id, w, h, parent);
    }

    get() {
        // get canvas by ???
    }
}

const CanvasStoreInstance = new CanvasStore();
Object.freeze(CanvasStoreInstance);
export default CanvasStoreInstance;