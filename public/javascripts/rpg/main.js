import GameMap from "./map";
import Controls from "./controls";
import Console from "./console";
import Events from "./events";
import Interface from "./interface";


const body = document.querySelector(".top");

// create map element
const mapElement = document.createElement("canvas");
mapElement.id = "map";
body.appendChild(mapElement);

window.GLOBALS = {
    TILE_WIDTH: 32,
    TILE_HEIGHT: 32,
    MAP_WIDTH: 10,
    MAP_HEIGHT: 10,
    ITEM_LIMIT: 99
}

// use this for static text content later?
const CONTENT = {

};

window.TILESET = [
	"#000",
	"#000",
	"#333",
	"#999",
	"#ffa464",
	"#00ff00",
	"#00ffff",
	"#fff",
	"#00ff99"
];

var gameObj;
class Game {
	constructor(map) {
		this.player = null;
        this.mapList = {};
        this.map = new GameMap(map, this, true);
		this.controls = new Controls(this);
		//this.mapList[this.map.mapName] = this.map;
		this.events = new Events();
		this.interface = new Interface(this);
		this.console = new Console();
	}
}

function getNodeIndex (n) {
		var i = 0;
		while(n = n.previousElementSibling) {
			i++;
		}
		return i;
	}

document.addEventListener('DOMContentLoaded', (e) => {
	gameObj = new Game('map1');
	gameObj.console.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");
});