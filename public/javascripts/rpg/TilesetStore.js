class TilesetStore {
    constructor() { 
        if (!TilesetStore.instance) {
            this.tilesets = [];
            TilesetStore.instance = this;
        }
        return TilesetStore.instance;

        // this.getTileCoordsById = function(id) { 
        //     var coords = false;
        //     this.Tilesets.forEach((tileset, i) => {
        //         if(id >= tileset.Tileset.firstgid) {
        //              // The firstgid of a tileset image will change per map unless special precautions are taken. 
        //              // This value should probably be stored as a tileName => firstgid per map
        //             coords = tileset.Tileset.getTileCoords(id);
        //             return;
        //         }
        //     });
        //     return coords;
        // }

        // this.getTilesetImageById = function(id) {
        //     var image = false;
        //     this.Tilesets.forEach((tileset, i) => {
        //         if(id >= tileset.Tileset.firstgid) { // need to flush this out a little
        //             image = tileset.Tileset.tilesetImage;
        //             return;
        //         }
        //     });
        //     return image;
        // }
            
        
        
    }

    add(Tileset) {
        Tileset.id = this.tilesets.length;
        this.tilesets.push(Tileset);
        console.log(this);
    }

    exists(Tileset) {
        return this.tilesets.filter((ts) => {
            return ts.name == Tileset.name && ts.image == Tileset.image;
        }).length > 0;
    }

    get(name) {
        return _.find((ts) => {
            return ts.name == name;
        });
    }
};

const instance = new TilesetStore();
Object.freeze(instance);

export default instance;