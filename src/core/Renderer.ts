import ConfigMgr from './ConfigMgr'
import Sprite from './Sprite'
import AnimatedSprite from './AnimatedSprite'
import Rectangle from './primitives/Rectangle'

class Renderer {
	constructor(ctx) {
		// if(!Renderer.instance) {
		// 	Renderer.instance = this;
		// 	this.ctx = ctx;
		// 	this.queue = [];
		// 	// sample queue element
		// 	// {region: {x, y}, callbackFn}
		// 	// is there a way to make a generic renderable object that can be passed to the queue?
		// 	// might be best to wait until visible elements are determined
		// 	// render queuing could be used for 'backface culling' to eliminate unnecessary render operations
		// 	// a compositing tree may be useful for determining visibility
		// 	// https://nothings.org/gamedev/compositing_tree/
		// 	// -OR-
		// 	// render tree objects <renderType> => { merge: fn, items: []}
		// 	// https://developer.ibm.com/tutorials/wa-canvashtml5layering/
			
		// }
		// return Renderer.instance;
	};

	static render() {

	}
}

// const instance = new Renderer();
// Object.freeze(instance);