export default class Player {
	constructor(canvas, game, pos={x:0,y:0}) {
		this.game = game;
		this.canvas = canvas;
		this.tilesDrawn = false;
		this.playerSize = GLOBALS.TILE_WIDTH;
		// player positioning
		this.pos_x = pos.x;
		this.pos_y = pos.y;

		// elem.style.top = this.pos_y + "px";
		// elem.style.left = this.pos_x + "px";

		// player attrs
		this.hp = 100;
		this.mp = 100;
		this.inventory = game.startingInventory;
		this.draw();
	};

	draw() {
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle = TILESET[6];
		ctx.fillRect(this.pos_x, this.pos_y, GLOBALS.TILE_WIDTH, GLOBALS.TILE_HEIGHT);
	}

	update() {
		// this.elem.style.top = this.pos_y + "px";
		// this.elem.style.left = this.pos_x + "px";
		this.game.map.render();
		this.draw();
	}
}
