import Canvas from './Canvas'

class CanvasStore {
    constructor() {
        this.canvasStore = {};
        return this;
    }

    create(parent, width, height, name) {
        let c = new Canvas(width, height, name, parent);
        this.canvasStore[name] = c;
        console.log(this.canvasStore);
        return c;
    }

    add(w, h, parent) {
        return Canvas.create(w, h, parent);
    }

    getById(id) {
        return Object.values(this.canvasStore).find((canvas) => {
            return canvas.id == id;
        });
    }

    getByName(name) {
        if (this.canvasStore.hasOwnProperty(name)) {
            return this.canvasStore[name];
        }
    }
}

const CanvasStoreInstance = new CanvasStore();
Object.freeze(CanvasStoreInstance);
export default CanvasStoreInstance;