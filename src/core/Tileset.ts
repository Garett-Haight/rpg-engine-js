import ConfigMgr from './ConfigMgr'
import GameMap from './GameMap/GameMap';
import TilesetService from './services/TilesetService'
import Tile from './Tile'


export default class Tileset {
    tilesetService: typeof TilesetService;
    _name: string;
    _tilesetImage: HTMLImageElement;
    _tilesetImageName: string;
    _tiles: any[];
    _columns: number;
    _rows: number;
    _tileWidth: number;
    _tileHeight: number;
    _tilesetWidth: number;
    _tilesetHeight: number;
    _tileCount: number;
    _tilesetImageSrc: any;

    /**
	 * @param  {String} tileset
	 */
    constructor(tileset) {

        this._name = tileset.name;
        this._tilesetImage = new Image();
        this._tilesetImage.src = ConfigMgr.getGlobal('IMG_PATH') + tileset.image;
        this._tilesetImageName = tileset.image;

        this._tiles = [];
        this._columns = tileset.columns;
        this._rows = tileset.rows;
        this._tileWidth = tileset.tilewidth;
        this._tileHeight = tileset.tileheight;
        this._tilesetWidth = tileset.imagewidth;
        this._tilesetHeight = tileset.imageheight;
        this._tileCount = tileset.tilecount;

        // this.tilesetService.getTileset('tileset').then((t) => {
        //     let data = t.data;
        //     let imgPath = data.image.split('\/');
        //     let img = imgPath[imgPath.length - 1];
        // });

    }
    
    buildTiles() {
        for(let i = 0; i < this._rows; i++) {
            this._tiles[i] = [];
            for(let j = 0; j < this._columns; j++) {
                let localId = i + j;
                let localX = (j * this._tileWidth);
                let localY = (i * this._tileHeight);
                this._tiles[i][j] = new Tile(this, localId, localX, localY);
            }
        }
    }

    getLocalfirstGid(map: GameMap) {
        return map._tilesets[this._name].firstgid;
    }

    getTileCoords(id) { // This should be cached?
         var x = (id * this._tileWidth) % this._tilesetWidth;
         // Might be able to replace Math.floor with | 0 bitwise operation
         var y = Math.floor((id * this._tileWidth) / this._tilesetWidth) * this._tileHeight;
         return {
             x: x,
             y: y
         };
     }

    getTileFromCoords(x, y, width, height) {

    }    

    getName() {
        return this._name;
    }

    getTilesetImage() {
        return this._tilesetImage;
    }

    getTilesetImageSrc() {
        return this._tilesetImageSrc;
    }

    getTilesetImageName() {
        return this._tilesetImageName;
    }

    getTileWidth() {
        return this._tileWidth;
    }

    getTileHeight() {
        return this._tileHeight;
    }

    getTilesetWidth() {
        return this._tilesetWidth;
    }

    getTilesetHeight() {
        return this._tilesetHeight;
    }
}