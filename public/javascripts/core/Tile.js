import { Globals } from './ConfigMgr'

export default class Tile {
    constructor (tileset, tileId, x, y) {
        this._tileset = tileset;
        this._id = tileId;
        this._x = x;
        this._y = y;
        this._ctx = ctx;
        this._width = width;
        this._height = height;
    }

    render(ctx, x, y) {
        ctx.drawImage(
            this._tileset.getTilesetImage(), 
            this._x,
            this._y,
            this._tileset.getTileWidth(),
            this._tileset.getTileHeight(),
            x,
            y,
            this._tileset.getTileWidth(),
            this._tileset.getTileHeight()
        );
    }
}