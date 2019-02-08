class TilesetStore {
    constructor() { 
        if (!TilesetStore.instance) {
            this.tilesets = [];
            TilesetStore.instance = this;
        }
        return TilesetStore.instance;            
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
        return this.tilesets.find((ts) => {
            return ts.name == name;
        });
    }
};

const instance = new TilesetStore();
Object.freeze(instance);

export default instance;