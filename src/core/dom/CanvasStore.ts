import Canvas from './Canvas'

interface IRepository<T> {
    add(item: T): void;
    getById(id: number): T | undefined;
    getByName(name: string): T | undefined;
    getAll(): T[];
}

class CanvasRepository implements IRepository<Canvas> {
    private canvases: Map<string, Canvas>;

    constructor() {
        this.canvases = new Map<string, Canvas>();
    }

    add(canvas: Canvas): void {
        this.canvases.set(canvas.name, canvas);
    }

    create(parent: any, width: number, height: number, name: string): Canvas {
        const c = new Canvas(width, height, name, parent);
        this.add(c);
        console.log(Array.from(this.canvases.entries()));
        return c;
    }

    addRaw(w: number, h: number, parent: HTMLElement): Canvas {
        const name = `canvas_${this.getAll().length}`;
        const c = new Canvas(w, h, name, parent);
        this.add(c);
        return c;
    }

    getById(id: number): Canvas | undefined {
        for (const canvas of Array.from(this.canvases.values())) {
            if (canvas.id === id) {
                return canvas;
            }
        }
        return undefined;
    }

    getByName(name: string): Canvas | undefined {
        return this.canvases.get(name);
    }

    getAll(): Canvas[] {
        return Array.from(this.canvases.values());
    }
}

const CanvasStoreInstance = new CanvasRepository();
Object.freeze(CanvasStoreInstance);
export default CanvasStoreInstance;