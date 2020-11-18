/**
 * @module Viewport
 */
import UI from './UI/index'
import Scene from './Scene'
import Renderer from './Renderer'

/**
 * Viewports are essentially canvas objects which contain a Scene element
 */
class Viewport {
    /**
     * 
     * @param {Element} parent DOM Element for containing Viewport
     * @param {number} width Width in pixels
     * @param {number} height Height in pixels
     * @param {Scene} defaultScene Scene to be loaded on initialization
     */
    constructor(parent, width, height, defaultScene) {
        this.container = parent;
        this.canvas = UI.createCanvas(parent, width, height);
        this.ctx = this.canvas.getContext("2d");
        this.activeScene = defaultScene;
        // this.clickListener = this.canvas.addEventListener('click', (e) => {
        //     //this.activeScene.handleEvent('click', e);
        // });
        //TODO: impl viewport or scene stacking
    }

    /**
     * 
     * @param {Scene} scene 
     */
    setScene(scene) {
        this.activeScene = scene;
        this.render(this.ctx);
    }

    /**
     * 
     * @param {number} time 
     */
    render(time) {
        if(this.activeScene && this.activeScene instanceof Scene) {
            this.activeScene.render(this.ctx, time);
        }
    }
}

export default Viewport;