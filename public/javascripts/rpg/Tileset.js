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
        this.maps = [];
        this.tileHeight = tileset.tileheight;
        this.tileWidth = tileset.tilewidth;
        // Width and Height in tiles... should probably add in support for tiles that can scale from the base image
        this.tilesetWidth = tileset.imagewidth;
        this.tilesetHeight = tileset.imageheight;
        // need to fix this in Tiled?
        this.tileCount = tileset.tilecount;

       this.getTileCoords = function(id) { // This should be cached
            var x = Math.round((id * this.tileWidth) % this.tilesetWidth);
            // Might be able to replace Math.floor with | 0 bitwise operation
            var y = Math.round((id * this.tileWidth) / this.tilesetWidth) * this.tileHeight;
            return {
                x: x, 
                y: y
            };
        }

        this.getTile = function(id, x, y, ctx) {
            ctx.getImageData(x, y, )
            return new Image();
        }

        //console.log(this.getTileCoords(0));
    }    

    

    // getTilesetHeight() {
    //     return Math.floor(this.tilesetImage.height / Globals.TILE_HEIGHT);
    // }

    // getTilesetWidth() {
    //     return Math.floor(this.tilesetImage.width / Globals.TILE_WIDTH);
    // }
}