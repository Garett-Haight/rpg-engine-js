import UI from './UI'
import Scene from './Scene'
import Renderer from './Renderer'

export default class Viewport {
    constructor(id, container, width, height, defaultScene) {
        this.container = container;
        this.canvas = UI.createCanvas(id, container, width, height);
        this.ctx = this.canvas.getContext("2d");
        this.activeScene = defaultScene;

        //TODO: impl viewport or scene stacking
    }

    setScene(scene) {
        this.activeScene = scene;
        this.render(this.ctx);
    }

    render() {
        // refactor. viewports shouldn't be specific to maps
        // if (this.activeMap.loaded) {
        //     this.activeMap.drawMap(this.canvas);
        // }
        this.activeScene.render(this.ctx);
    }
}