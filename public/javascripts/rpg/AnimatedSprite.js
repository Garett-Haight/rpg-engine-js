import Globals from './Globals'
import Sprite from './Sprite'

export default class AnimatedSprite {
    constructor(spriteArr, animationName) { 
        this._frames = spriteArr;
        this._currentFrame = 0;
        this._animationName = animationName;
    }

    buildAnimation(animationObject) {
        
    }

    getNextFrame() {
        this._currentFrame++;
        return this._frames[this.currentFrame];
    }

    render() {
        this._frames[this.currentFrame].render();
    }
}