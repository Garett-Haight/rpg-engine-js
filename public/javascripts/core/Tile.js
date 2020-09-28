import { Globals } from './ConfigMgr'

export default class Tile {
    constructor(tileId, x, y) {
        // this.tile = new Image();
        this._x = x;
        this._y = y;
        // this._width = width;
        // this._height = height;
    }

    build() {

    }

    render(ctx, x, y) {
        ctx.fillStyle = `rgb(
            ${Math.floor(255 - (Math.random() * 100))},
            ${Math.floor(255 - (Math.random() * 100))},
            0)`;
        ctx.fillRect(x, y, Globals.TILE_HEIGHT, Globals.TILE_WIDTH);
    }
}