import Globals from './Globals'

export default class Tileset {
    constructor(tileset) { 
        this._name = tileset.name;

        this._tilesetImage = new Image();
        this._tilesetImage.src = Globals.IMG_PATH + tileset.image;
        this._tilesetImageName = tileset.image;

        this._tileWidth = tileset.tilewidth;
        this._tileHeight = tileset.tileheight;
        this._tilesetWidth = tileset.imagewidth;
        this._tilesetHeight = tileset.imageheight;
        this._tileCount = tileset.tilecount;

    }
    
    getTileCoords(id) { // This should be cached?
         var x = (id * this._tileWidth) % this._tilesetWidth;
         // Might be able to replace Math.floor with | 0 bitwise operation
         var y = Math.floor((id * this._tileWidth) / this._tilesetWidth) * this._tileHeight;
         return {
             x: x, 
             y: y
         };
     }

    getTileFromCoords(x, y, width, height) {

    }    

    getName() {
        return this._name;
    }

    getTilesetImage() {
        return this._tilesetImage;
    }

    getTilesetImageSrc() {
        return this._tilesetImageSrc;
    }

    getTilesetImageName() {
        return this._tilesetImageName;
    }

    getTileWidth() {
        return this._tileWidth;
    }

    getTileHeight() {
        return this._tileHeight;
    }

    getTilesetWidth() {
        return this._tilesetWidth;
    }

    getTilesetHeight() {
        return this._tilesetHeight;
    }

 
}