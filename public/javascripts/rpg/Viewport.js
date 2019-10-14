import UI from './UI'
import Scene from './Scene'
import Renderer from './Renderer'

export default class Viewport {
    constructor(id, container, width, height, defaultMap=null) {
        this.container = container;
        this.canvas = UI.createCanvas(id, container, width, height);
        this.activeMap = defaultMap;
    }

    setScene(scene) {
        this.activeScene = scene;
        this.render();
    }

    render() {
        // refactor. viewports shouldn't be specific to maps
        if (this.activeMap.loaded) {
            this.activeMap.drawMap(this.canvas);
        }
        this.activeScene.render();
    }
}