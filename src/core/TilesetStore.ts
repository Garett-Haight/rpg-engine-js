import TilesetService from "./services/TilesetService";
import Tileset from "./Tileset";

class TilesetStore {
  static instance: TilesetStore;
  private _tilesetsSet:Set<Tileset>;
  private _tilesets:
    | {
        string: Tileset;
      }
    | {};
  private _gidMap: Map<any, any>;

  /**
   * @return {TilesetStore}
   */
  constructor() {
    if (!TilesetStore.instance) {
      this._tilesets = {};
      this._gidMap = new Map();
      TilesetStore.instance = this;
    }
    console.log(TilesetStore.instance);
    return TilesetStore.instance;
  }

  /**
   *
   * @param {Tileset} tileset tileset name
   * @returns {Tileset}
   */
  add(tileset: Tileset): Tileset {
    this._tilesets[tileset._name] = tileset;
    return tileset;
  }

  /**
   *
   * @param {string} tileset tileset name
   * @returns {boolean}
   */
  exists(tileset) {
    return (
      this._tilesets.hasOwnProperty(tileset) &&
      this._tilesets[tileset] instanceof Tileset
      && this._tilesets[tileset].firstgid !== undefined // first gid doesn't exist, if loaded for sprites
    );
  }

  /**
   *
   * @param {Tileset | string} tileset
   * @returns {Tileset} Tileset instance
   */
  get(tileset: Tileset | string) {
    if (tileset instanceof Tileset) {
      return this._tilesets[tileset._name];
    } else {
      return this._tilesets[tileset];
    }
  }

  getGlobalGidMap() {
    return this._gidMap;
  }

  getGidMapForGameMap(tileset, map) {
    if (this._gidMap.has(tileset)) {
      // TODO: update gid heirarchy
      let ts = this._gidMap.get(tileset);
      if (ts.has(map)) {
        return ts.get(map);
      }
    }
    return null;
  }
}

export default new TilesetStore();