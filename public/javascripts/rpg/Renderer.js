import Globals from './Globals'
import TilesetStore from './TilesetStore'
import Sprite from './Sprite'
import AnimatedSprite from './AnimatedSprite'
import Rectangle from './Rectangle'
import Config from './Config'

class Renderer {
	constructor(ctx) {
		if(!Renderer.instance) {
			Renderer.instance = this;
		}
		return Player.instance;
	};
}

const instance = new Renderer();
// Object.freeze(instance);

export default instance;