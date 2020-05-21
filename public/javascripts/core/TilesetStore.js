import TilesetService from './services/TilesetService'

class TilesetStore {
    constructor() { 
        if (!TilesetStore.instance) {
            this._tilesets = [];
            TilesetStore.instance = this;
        }
        return TilesetStore.instance;            
    }

    add(tileset) {
        tileset.id = this._tilesets.length;
        this._tilesets.push(tileset);
        return tileset;
    }

    exists(tileset) {
        return this._tilesets.find((ts) => {
            if (typeof tileset == 'string') {
                return ts.getName() == tileset;
            }
            else {
                return ts.getName() == tileset.getName();
            }
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