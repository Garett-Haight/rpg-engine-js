import UI from './UI/index'
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

    render(time) {
        this.activeScene.render(this.ctx, time);
    }
}