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
        // Width and Height in tiles... should probably add in support for tiles that can scale from the base image
        this.tilesetWidth = tileset.imagewidth;
        this.tilesetHeight = tileset.imageheight;
        // need to fix this in Tiled?
        this.tileCount = tileset.tilecount;


       this.getTileCoords = function(firstGid, id) { // This should be cached
            var localId = id - firstGid;
            var x = ((localId - this.firstgid) % (this.tilesetWidth) * Globals.TILE_WIDTH);
            // Might be able to replace Math.floor with | 0 bitwise operation
            var y = Math.floor((id - this.firstgid) / (this.tilesetWidth))  * Globals.TILE_HEIGHT;
            return {x: x, y: y};
        }
        //console.log(this.getTileCoords(0));
    }    

    addFirstGid(mapName, gid) {
        this.maps[mapName] = gid;
    }

    // getTilesetHeight() {
    //     return Math.floor(this.tilesetImage.height / Globals.TILE_HEIGHT);
    // }

    // getTilesetWidth() {
    //     return Math.floor(this.tilesetImage.width / Globals.TILE_WIDTH);
    // }
}