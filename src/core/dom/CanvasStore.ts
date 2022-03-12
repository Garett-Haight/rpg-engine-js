import Canvas from './Canvas'

class CanvasStore {
    canvasStore: {
        [key: string]: Canvas
    };
    constructor() {
        this.canvasStore = {};
        return this;
    }

    create(parent: any, width: number, height: number, name: string) {
        let c = new Canvas(width, height, name, parent);
        this.canvasStore[name] = c;
        console.log(this.canvasStore);
        return c;
    }

    add(w: number, h: number, parent: HTMLElement) {
        return Canvas.create(w, h, parent);
    }

    getById(id: number) {
        return Object.values(this.canvasStore).find((canvas) => {
            return canvas.id == id;
        });
    }

    getByName(name: string) {
        if (this.canvasStore.hasOwnProperty(name)) {
            return this.canvasStore[name];
        }
    }
}

const CanvasStoreInstance = new CanvasStore();
Object.freeze(CanvasStoreInstance);
export default CanvasStoreInstance;