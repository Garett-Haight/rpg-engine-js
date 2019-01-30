import Globals from './Globals'

class Tile {
    constructor() {

    }

}
export default class Tileset {
    constructor(tileset) { 
        this.name = tileset.name;

        this.tilesetImage = new Image();
        this.tilesetImage.src = Globals.IMG_PATH + tileset.image;
        this.tilesetImageName = tileset.image;

        this.tileWidth = tileset.tilewidth;
        this.tileHeight = tileset.tileheight;
        this.tilesetWidth = tileset.imagewidth;
        this.tilesetHeight = tileset.imageheight;
        this.tileCount = tileset.tilecount;

       this.getTileCoords = function(id) { // This should be cached?
            var x = (id * this.tileWidth) % this.tilesetWidth;
            // Might be able to replace Math.floor with | 0 bitwise operation
            var y = Math.floor((id * this.tileWidth) / this.tilesetWidth) * this.tileHeight;
            return {
                x: x, 
                y: y
            };
        }
    }    
}