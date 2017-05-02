const body = document.querySelector(".top");

// create map element
const mapElement = document.createElement("div");
mapElement.id = "map";
body.appendChild(mapElement);

const GLOBALS = {
	TILE_WIDTH: 32,
	TILE_HEIGHT: 32,
	MAP_WIDTH: 10,
	MAP_HEIGHT: 10,
	ITEM_LIMIT: 99
}

// use this for static text content later?
const CONTENT = {

};

var gameObj;
class Game {
	constructor(map) {
		this.player = null;
        this.mapList = {};
        this.map = new Map(map, this, true);
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