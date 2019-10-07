class TilesetStore {
    constructor() { 
        if (!TilesetStore.instance) {
            this._tilesets = [];
            TilesetStore.instance = this;
        }
        return TilesetStore.instance;            
    }

    add(Tileset) {
        Tileset.id = this._tilesets.length;
        this._tilesets.push(Tileset);
        console.log(this);
    }

    exists(Tileset) {
        return this._tilesets.find((ts) => {
            return ts.getName() == Tileset.getName() && ts.getImage() == Tileset.getImage();
        });
    }

    get(name) {
        return this._tilesets.find((ts) => {
            return ts.getName() == name;
        });
    }
};

const instance = new TilesetStore();
Object.freeze(instance);

export default instance;