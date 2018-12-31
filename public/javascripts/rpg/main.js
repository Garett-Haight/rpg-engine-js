import Game from "./Game"
import {MapStore} from "./MapStore";
import GameMap from "./GameMap";
import Controls from "./Controls";
import Console from "./Console";
import Events from "./Events";
import UI from "./UI";
import NPC from "./NPC";
import TilesetStore from "./TilesetStore";
import Tileset from "./Tileset";



const body = document.querySelector(".top");

// create map element
// const mapElement = document.createElement("canvas");
// mapElement.id = "map";
// body.appendChild(mapElement);

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

function getNodeIndex (n) {
		var i = 0;
		while(n = n.previousElementSibling) {
			i++;
		}
		return i;
	}

document.addEventListener('DOMContentLoaded', (e) => {
	window.gameObj = new Game("#gameContainer", 1);
	window.gameObj.console.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");
});