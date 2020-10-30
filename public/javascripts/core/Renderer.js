import { Globals, Config } from './ConfigMgr'
import TilesetStore from './TilesetStore'
import Sprite from './Sprite'
import AnimatedSprite from './AnimatedSprite'
import Rectangle from './primitives/Rectangle'

class Renderer {
	constructor(ctx) {
		if(!Renderer.instance) {
			Renderer.instance = this;
			this.ctx = ctx;
			this.queue = [];
			// sample queue element
			// {region: {x, y}, callbackFn}
			// is there a way to make a generic renderable object that can be passed to the queue?
			// might be best to wait until visible elements are determined
			// render queuing could be used for 'backface culling' to eliminate unnecessary render operations
			// a compositing tree may be useful for determining visibility
			// https://nothings.org/gamedev/compositing_tree/
		}
		return Renderer.instance;
	};

	static render() {

	}
}

const instance = new Renderer();
// Object.freeze(instance);

export default instance;