class Player {
	constructor(elem, pos={x:0,y:0}) {
		this.elem = elem;
		this.tilesDrawn = false;

		// player positioning
		this.pos_x = pos.x;
		this.pos_y = pos.y;
		elem.style.top = this.pos_y + "px";
		elem.style.left = this.pos_x + "px";

		// player attrs
		this.hp = 100;
		this.mp = 100;
		this.inventory = {};
	};

	update() {
		this.elem.style.top = this.pos_y + "px";
		this.elem.style.left = this.pos_x + "px";
	}
}
