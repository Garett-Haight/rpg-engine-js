import Globals from './Globals';
import TilesetStore from './TilesetStore';

export default class Sprite {
    constructor(sheet, x, y, width, height) { 
        this._spriteSheet = sheet;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._tileset = TilesetStore.get(sheet);
        this._sprite = new Image(width, height);

        // var canvas = document.createElement("canvas");
        // canvas.width = width;
        // canvas.height = height;
        // canvas.getContext("2d").drawImage(this._sprite, 0, 0);
        // this._sprite.src = canvas.toDataURL('image/png');
        // //this._tileset.getTileFromCoords(x, y, width, height);
        // console.log(this);
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
}