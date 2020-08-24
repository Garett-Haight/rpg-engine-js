import GameObject from './GameObject'
import Rectangle from '../primitives/Rectangle'
import SpriteStore from '../SpriteStore'

export default class Player extends GameObject {
    constructor(args) {
        super();
        let defaults = {
            x: 0,
            y: 0,
            currentAnimation: 'default',
            movementSpeed: 0
        };

        this._x = args.x || defaults.x;
        this._y = args.y || defaults.y;
        this._height = args.height || defaults.height;
        this._width = args.width || defaults.width;
        this._bounds = new Rectangle(x, y, this._width, this._height);
        this._movementSpeed = args.movementSpeed || defaults.movementSpeed;
        this._currentAnimation = args.currentAnimation || defaults.currentAnimation;
        this._animations = args.animations || [];

    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    render(ctx, time) {

    }
}