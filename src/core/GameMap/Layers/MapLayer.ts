import GameMap from "../GameMap";
interface layerJSON {
	name: string;
	width: number;
	height: number;
	objects?: any[]
};

class MapLayer {
	name: string;
	width: number;
	height: number;
	_map: GameMap;
	raw: layerJSON;
	constructor(layer: layerJSON, map: GameMap) {
		this.raw = layer;
		this.name = layer.name;
		this.width = layer.width;
		this.height = layer.height;
		this._map = map;
    }
    
    render(ctx: CanvasRenderingContext2D, time: Number) {
        
    }
}

export default MapLayer;