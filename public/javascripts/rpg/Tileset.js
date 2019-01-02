import Globals from './Globals'

export default class Tileset {
    constructor(tileset) { 
        this.name = tileset.name
        this.src = tileset.src;
        this.firstgid = tileset.firstgid;
        console.log(this);
        this.tilesetImage = new Image();
        this.tilesetImage.src = Globals.img_path + tileset.src;

        // Width and Height in tiles... should probably add in support for tiles that can scale from the base image
        this.tilesetWidth = tileset.width;
        this.tilesetHeight = tileset.height;

       this.getTileCoords = function(id) { // This should be cached
            var x = ((id - this.firstgid) % (this.tilesetWidth) * Globals.TILE_WIDTH);
            // Might be able to replace Math.floor with | 0 bitwise operation
            var y = Math.floor((id - this.firstgid) / (this.tilesetWidth))  * Globals.TILE_HEIGHT;
            return {x: x, y: y};
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