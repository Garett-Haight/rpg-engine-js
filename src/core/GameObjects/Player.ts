import GameObject from './GameObject'
import Rectangle from '../primitives/Rectangle'

export interface PlayerInitArgs {
    x?: number
    y?: number
    height?: number
    width?: number
    movementSpeed?: number
    currentAnimation?: string
    animations?: unknown[]
}

export default class Player extends GameObject {
    _x: number
    _y: number
    _height: number
    _width: number
    _bounds: Rectangle
    _movementSpeed: number
    _currentAnimation: string
    _animations: unknown[]

    constructor(args: PlayerInitArgs) {
        super(args)
        const defaults = {
            x: 0,
            y: 0,
            height: 32,
            width: 32,
            currentAnimation: 'default',
            movementSpeed: 0,
        }

        this._x = args.x ?? defaults.x
        this._y = args.y ?? defaults.y
        this._height = args.height ?? defaults.height
        this._width = args.width ?? defaults.width
        this._bounds = new Rectangle(this._x, this._y, this._width, this._height)
        this._movementSpeed = args.movementSpeed ?? defaults.movementSpeed
        this._currentAnimation = args.currentAnimation ?? defaults.currentAnimation
        this._animations = args.animations ?? []
    }

    getX() {
        return this._x
    }

    getY() {
        return this._y
    }

    getBounds() {
        return this._bounds
    }

    getMovementSpeed() {
        return this._movementSpeed
    }

    getCurrentAnimation() {
        return this._currentAnimation
    }

    getAnimations() {
        return this._animations
    }

    setX(x: number) {
        this._x = x
    }

    setY(y: number) {
        this._y = y
    }
    
    setBounds(bounds: Rectangle) {
        this._bounds = bounds
    }

    setMovementSpeed(movementSpeed: number) {
        this._movementSpeed = movementSpeed
    }
    
    
    setCurrentAnimation(currentAnimation: string) {
        this._currentAnimation = currentAnimation
    }

    setAnimations(animations: unknown[]) {
        this._animations = animations
    }       

    render(_ctx: CanvasRenderingContext2D, _time: DOMHighResTimeStamp) {

    }
}
