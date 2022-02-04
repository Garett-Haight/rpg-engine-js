import ConfigMgr from './ConfigMgr'
import Tileset from './Tileset';

export default class Tile {
    _tileset: any;
    _id: any;
    _x: any;
    _y: any;
    _ctx: any;
    _width: any;
    _height: any;

    constructor (tileset: Tileset, tileId: number, x, y) {
        this._tileset = tileset;
        this._id = tileId;
        this._x = x;
        this._y = y;
        this._width = tileset.getTileWidth();
        this._height = tileset.getTileHeight();
    }

    render(ctx, x, y) {
        ctx.drawImage(
            this._tileset.getTilesetImage(), 
            this._x,
            this._y,
            this._width,
            this._height,
            x,
            y,
            this._width,
            this._height
        );
    }
}