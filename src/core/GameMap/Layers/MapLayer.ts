import IRenderable from "../../Interfaces/IRenderable";
import GameMap from "../GameMap";
interface layerJSON {
	name: string;
	width: number;
	height: number;
	objects?: any[]
};

class MapLayer implements IRenderable {
	name: string;
	width: number;
	height: number;
	map: GameMap;
	raw: layerJSON;
	constructor(layer: layerJSON, map: GameMap) {
		this.raw = layer;
		this.name = layer.name;
		this.width = layer.width;
		this.height = layer.height;
		this.map = map;
    }
    
    render(ctx: CanvasRenderingContext2D, time: DOMHighResTimeStamp) {
        
    }
}

export default MapLayer;