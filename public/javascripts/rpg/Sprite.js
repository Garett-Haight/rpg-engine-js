import Globals from './Globals';
import TilesetStore from './TilesetStore';
import SpriteStore from './SpriteStore';

export default class Sprite {
    constructor(sheet, x, y, width, height, name) { 
        this._name = name;
        this._spriteSheet = sheet;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._tileset = TilesetStore.get(sheet);
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

    render(ctx) {
        var destX = 1;
        var destY = 1;
        ctx.drawImage(
            this.getTileset().getTilesetImage(),
            this.getX(),
            this.getY(),
            this.getWidth(), 
            this.getHeight(), 
            destX,
            destY,
            16,
            20
        );
    }
}