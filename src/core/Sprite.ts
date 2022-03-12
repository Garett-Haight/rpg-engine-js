import ConfigMgr from './ConfigMgr'
import TilesetStore from './TilesetStore'
import Tileset from './Tileset'
import SpriteStore from './SpriteStore'

export default class Sprite {
    _name: string;
    _spriteSheet: any;
    _x: number;
    _y: number;
    _width: number;
    _height: number;
    _tileset: Tileset;
    _sprite: HTMLImageElement;
    _scale: number;

    constructor(sheet: Tileset, x: number, y:number, width:number, height:number, name:string, scale:number = 1) { 
        this._name = name;
        console.log(scale);
        // if (!TilesetStore.exists(sheet)) {
        //     TilesetStore.add(sheet);
        // }
        this._spriteSheet = sheet;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._scale = scale; 
        this._tileset = sheet instanceof Tileset ? sheet : TilesetStore.get(sheet);
        this._sprite = new Image(width, height);
    }   

    get() {
        return this;
    }

    getName() {
        return this._name;
    }

    getImage() {
        return this._sprite;
    }

    getSpritesheet() {
        return this._spriteSheet;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    getTileset() {
        return this._tileset;
    }

    render(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        if (this._scale == -1) {
            console.log(this);
        }
        ctx.drawImage(
            this.getTileset().getTilesetImage(),
            this.getX(),
            this.getY(),
            this.getWidth(),
            this.getHeight(),
            x,
            y,
            w * this._scale,
            h * this._scale
        );
    }
}