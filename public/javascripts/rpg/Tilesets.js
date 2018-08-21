// add quest support, duh
export default class Tilesets {
    constructor(Tilesets) { 
        this.Tilesets = [];
        Tilesets.forEach(element => {
            this.Tilesets.push({
                id: this.Tilesets.length,
                Tileset: element
            });
        });
    }
}