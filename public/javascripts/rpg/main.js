import GameMap from "./map";
import Controls from "./controls";
import Console from "./console";
import Events from "./events";
import UI from "./UI";
import NPC from "./NPC";
import Tileset from "./Tileset";
import Tilesets from "./Tilesets";


const body = document.querySelector(".top");

// create map element
const mapElement = document.createElement("canvas");
mapElement.id = "map";
body.appendChild(mapElement);

window.GLOBALS = {
    TILE_WIDTH: 16,
    TILE_HEIGHT: 16,
    MAP_WIDTH: 20,
    MAP_HEIGHT: 20,
	ITEM_LIMIT: 99,
	img_path: "/images/"
}

// use this for static text content later?
const CONTENT = {

};

// var tileImages = ["0x72_16x16DungeonTileset.v4.png", "0x72_16x16DungeonTileset_walls.v1.png"];
var tileImages = [
	{
		src: "0x72_16x16DungeonTileset_walls.v1.png", // going to need to get first gid values for each tileset
		height: 16,
		width: 16
	}
];

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
		this.tileSets = [];
        this.map = new GameMap(map, this, true);
		this.controls = new Controls(this);
		//this.mapList[this.map.mapName] = this.map;
		this.events = new Events();
		this.ui = new UI(this);
		this.console = new Console();
		// starting inventory
		this.startingInventory = {potion: 1, mana: 1};
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
	window.gameObj = new Game(1);
	window.gameObj.console.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");
});