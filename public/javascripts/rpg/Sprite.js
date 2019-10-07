import Globals from './Globals';
import TilesetStore from './TilesetStore';

export default class Sprite {
    constructor(sheet, x, y, width, height) { 
        this._spriteSheet = sheet;
        let tileset = TilesetStore.get(sheet);
        
    }    
}