import TilesetService from "./services/TilesetService";
import Tileset from "./Tileset";

class TilesetStore {
  constructor() {
    if (!TilesetStore.instance) {
      this._tilesets = {};
      this._gidMap = new Map();
      TilesetStore.instance = this;
    }
    return TilesetStore.instance;
  }

/**
 * 
 * @param {string} tileset tileset name 
 * @returns {Tileset}
 */
  add(tileset) {
    tileset.id = this._tilesets.length;
    this._tilesets.push(tileset);
    return tileset;
  }
  
/**
 * 
 * @param {string} tileset tileset name
 * @returns {boolean} 
 */
  exists(tileset) {
    return this._tilesets.hasOwnProperty(tileset) && this._tilesets[tileset] instanceof Tileset;
  }
  
  /**
   * 
   * @param {string} tileset 
   * @returns {Tileset} Tileset instance
   */
  get(tileset) {
    return this._tilesets[tileset];
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
