import Globals from './Globals'
import TilesetStore from './TilesetStore'
import Sprite from './Sprite'
import AnimatedSprite from './AnimatedSprite'
import Rectangle from './primitives/Rectangle'
import Config from './Config'

class Renderer {
	constructor(ctx) {
		if(!Renderer.instance) {
			Renderer.instance = this;
			this.ctx = ctx;
		}
		return Renderer.instance;
	};

	static render() {

	}
}

const instance = new Renderer();
// Object.freeze(instance);

export default instance;