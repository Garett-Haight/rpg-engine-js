import TilesetService from "./services/TilesetService";

class TilesetStore {
  constructor() {
    if (!TilesetStore.instance) {
      this._tilesets = [];
      this._gidMap = new Map();
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
      if (typeof tileset == "string") {
        return ts.getName() == tileset;
      } else {
        return ts.getName() == tileset.getName();
      }
    });
  }

  get(name) {
    // Fetch from service if not found
    return this._tilesets.find((ts) => {
      return ts.getName() == name;
    });
  }

  getGlobalGidMap() {
    return this._gidMap;
  }

  getGidMapForGameMap(tileset, map) {
    if (this._gidMap.has(tileset)) { // TODO: update gid heirarchy
        let ts = this._gidMap.get(tileset);
        if (ts.has(map)) {
            return ts.get(map);
        }
    }
    return null;
  }
}

const instance = new TilesetStore();
Object.freeze(instance);

export default instance;
