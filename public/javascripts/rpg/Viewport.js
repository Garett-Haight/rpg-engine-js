import UI from './UI'
import Renderer from './Renderer'

export default class Viewport {
    constructor(id, container, width, height, defaultMap=null) {
        this.container = container;
        this.canvas = UI.createCanvas(id, container, width, height);
        this.activeMap = defaultMap;
    }

    render() {
        if (this.activeMap.loaded) {
            this.activeMap.drawMap(this.canvas);
        }
    }
}