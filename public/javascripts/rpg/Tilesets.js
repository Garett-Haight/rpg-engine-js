export default class Tilesets {
    constructor(Tilesets) { 
        this.Tilesets = [];
        Tilesets.forEach(element => {
            this.Tilesets.push({
                id: this.Tilesets.length,
                Tileset: element
            });
        });


        this.getTileCoordsById = function(id) { 
            var coords = false;
            this.Tilesets.forEach((tileset, i) => {
                if(id >= tileset.Tileset.firstgid) {
                     // The firstgid of a tileset image will change per map unless special precautions are taken. 
                     // This value should probably be stored as a tileName => firstgid per map
                    coords = tileset.Tileset.getTileCoords(id);
                    return;
                }
            });
            return coords;
        }

        this.getTilesetImageById = function(id) {
            var image = false;
            this.Tilesets.forEach((tileset, i) => {
                if(id >= tileset.Tileset.firstgid) { // need to flush this out a little
                    image = tileset.Tileset.tilesetImage;
                    return;
                }
            });
            return image;
        }
    }
}