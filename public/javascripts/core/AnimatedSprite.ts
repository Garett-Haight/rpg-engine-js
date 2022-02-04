import ConfigMgr  from './ConfigMgr'
import Sprite from './Sprite'

export default class AnimatedSprite {
    private _frames: any[];
    private _currentFrame: number;
    private _animationName: any;
    private _firstRender: boolean;
    private _lastRenderTime: number;

    constructor(spriteArr, animationName) { 
        this._frames = spriteArr;
        this._currentFrame = 0;
        this._animationName = animationName;
        this._firstRender = false;
        this._lastRenderTime = 0;
    }

    buildAnimation(animationObject) {
        
    }

    getNextFrame() {
        this._currentFrame++;
        if(!this._frames[this._currentFrame]) { // check for looping eventually
            this._currentFrame = 0;
        }
        return this._currentFrame;
    }

    render(ctx, x, y, w, h, scale=2, time) {
        if(!this._firstRender) {
            if (time - this._lastRenderTime > 160) {
                this.getNextFrame();
                this._lastRenderTime = time;
            }
            this._frames[this._currentFrame].render(ctx, x, y, w, h, scale);
        }
        else {
            this._lastRenderTime = time;
        }
    }
}