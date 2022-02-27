/**
 * @module Viewport
 */
import UI from './UI/index';
import Scene from './Scene';
import Canvas from './dom/Canvas';

/**
 * Viewports are essentially canvas objects which contain Scene element(s)
 */
class Viewport {
    container: HTMLElement;
    canvas: Canvas;
    ctx: CanvasRenderingContext2D | WebGLRenderingContext;
    activeScene: Scene;

    /**
     * 
     * @param {Element} parent DOM Element for containing Viewport
     * @param {number} width Width in tiles
     * @param {number} height Height in tiles
     * @param {Scene} defaultScene Scene to be loaded on initialization
     * @param {string} name name of viewport
     */
    constructor(parent: HTMLElement, width: number, height: number, defaultScene: Scene, name: string) {
        this.container = parent;
        this.canvas = UI.createCanvas(parent, width, height, `${name}-default`);
        this.ctx = this.canvas.getCanvasContext();
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
    setScene(scene: Scene) {
        this.activeScene = scene;
    }

    /**
     * 
     * @param {number} time 
     */
    render(time: number) {
        if(this.activeScene && this.activeScene instanceof Scene) {
            this.activeScene.render(this.ctx, time);
        }
    }
}

export default Viewport;