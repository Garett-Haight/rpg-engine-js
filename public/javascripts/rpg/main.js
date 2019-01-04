import Config from './Config'
import Game from "./Game"


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

document.addEventListener('DOMContentLoaded', (e) => {
	var gameObj = new Game(Config);
});