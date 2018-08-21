export default class Controls {
    constructor(game) {
        this.game = game;
        this.events = [];
        // event listeners
        // TODO: Debounce input
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
        return !this.checkCollision({
            x: player.pos_x, 
            y: player.pos_y - player.playerSize
        });
    }

    moveDown(player) {
        if (this.checkDown(player)) {
            player.pos_y += GLOBALS.TILE_HEIGHT;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkDown(player) {
        return !this.checkCollision({
            x: player.pos_x, 
            y: player.pos_y + (player.playerSize * 2) // check the point that you're moving TO
        });
    }

    moveRight(player) {
        if (this.checkRight(player)) {
            player.pos_x += GLOBALS.TILE_WIDTH;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkRight(player) {
        return !this.checkCollision({
            x: player.pos_x + (player.playerSize * 2), 
            y: player.pos_y
        });
    }


    moveLeft(player) {
        if (this.checkLeft(player)) {
            player.pos_x -= GLOBALS.TILE_WIDTH;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkLeft(player) {
        return !this.checkCollision({
            x: player.pos_x - player.playerSize,
            y: player.pos_y
        });
    }

    checkCollision(p) {
        for (let collisions of this.game.map.collisions) {
            // return true if collides with collision rect or falls outside map bounds
            var collides =  this.isInBounds(p, collisions) || 
            p.y < 0 || 
            p.y > (GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT) ||
            p.x < 0 ||
            p.x > (GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH);
            if(collides) { return true; }
        }
    }

    isInBounds(p, rect) { // returns true if p is within the bounds of rect
        return  (p.x <= rect.x + rect.width && p.x > rect.x) &&
                (p.y <= rect.y + rect.height && p.y > rect.y);

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

    toggleInventoryStatusPanel() {
        var ui = this.game.ui;
        if(!ui.inventoryOpen) {
            ui.viewInventory();
        }
        else {
            ui.viewStatus();
        } 
    }
}