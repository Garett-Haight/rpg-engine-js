class Controls {
    constructor(game) {
        this.game = game;
        this.events = [];
        // event listeners
        document.addEventListener('keydown', (e) => {
        	//console.log(e);
            if (e.keyCode === 40) { // Arrow Down
                // move down
                e.preventDefault();
                this.moveDown(game.player);
            } else if (e.keyCode === 39) { // Arrow Right
                // move right
                e.preventDefault();
                this.moveRight(game.player);
            } else if (e.keyCode === 38) { // Arrow Up
                // move up
                e.preventDefault();
                //moveUp(player);
                this.moveUp(game.player);
            } else if (e.keyCode === 37) { // Arrow Left
                // move left
                e.preventDefault();
                this.moveLeft(game.player);
            } else if (e.keyCode === 32) { // spacebar
            	this.interact(game.player, game.map);
            }
        });

        
    }



    moveUp(player) {
        if (this.checkUp(player)) {
            player.pos_y -= GLOBALS.TILE_HEIGHT;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkUp(player) {
        if(player.pos_y > 0) { // stay within map bounds
            var upRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT) - 1;
            var upCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH);
            // return value from collision map
            return !this.game.map.collisions[upRow][upCol];
        }
    }

    moveDown(player) {
        if (this.checkDown(player)) {
            player.pos_y += GLOBALS.TILE_HEIGHT;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkDown(player) {
        if (player.pos_y < ((GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT) - GLOBALS.TILE_HEIGHT)) {
            var downRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT) + 1;
            var downCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH);
            return !this.game.map.collisions[downRow][downCol];
        }
    }

    moveRight(player) {
        if (this.checkRight(player)) {
            player.pos_x += GLOBALS.TILE_WIDTH;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkRight(player) {
        if (player.pos_x < ((GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH) - GLOBALS.TILE_WIDTH)) {
            var rightRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT);
            var rightCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH) + 1;
            return !this.game.map.collisions[rightRow][rightCol];
        }
    }


    moveLeft(player) {
        if (this.checkLeft(player)) {
            player.pos_x -= GLOBALS.TILE_WIDTH;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkLeft(player) {
        if (player.pos_x > 0) {
            var leftRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT);
            var leftCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH) - 1;
            return !this.game.map.collisions[leftRow][leftCol];
        }
    }

    interact(player, map) {
    	if(this.events.length > 0) {
    		var event = this.events[0]['properties']['action'];
	    	var result = this.game.events.eventList[event](this.events[0], this.game);
	    	this.game.console.sendMessage(result);
    	}
    }

    checkForEvent(player, map) {
    	this.events = [];
    	for (let e of map.events) {
            // events are positioned at bottom left in Tiled....
    		if (e.x == player.pos_x && e.y == player.pos_y + GLOBALS.TILE_HEIGHT) {
    			this.events.push(e);
    		}
    	}
    }

    viewInventory() {
        this.inv.className = "";
        this.statusPanel.className = "hide";
    }
}