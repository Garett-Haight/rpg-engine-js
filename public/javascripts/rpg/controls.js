import Globals from './Globals'
import Player from './Player'

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
                this.moveDown();
            } else if (e.keyCode === 39) { // Arrow Right
                // move right
                e.preventDefault();
                this.moveRight();
            } else if (e.keyCode === 38) { // Arrow Up
                // move up
                e.preventDefault();
                //moveUp(player);
                this.moveUp();
            } else if (e.keyCode === 37) { // Arrow Left
                // move left
                e.preventDefault();
                this.moveLeft();
            } else if (e.keyCode === 32) { // spacebar
            	//this.interact(game.player, game.map);
            }
        });

        
    }



    moveUp() {
        if (this.checkUp()) {
            Player.setPositionY(Player.pos_y - Globals.TILE_HEIGHT);
           // player.update();
           // this.checkForEvent(player, this.game.map);
        }
    }

    checkUp() {
        return !this.checkCollision({
            x: Player.pos_x, 
            y: Player.pos_y - Player.playerSize
        });
    }

    moveDown() {
        if (this.checkDown()) {
            Player.setPositionY(Player.pos_y + Globals.TILE_HEIGHT);
            //player.update();
           // this.checkForEvent(player, this.game.map);
        }
    }

    checkDown() {
        return !this.checkCollision({
            x: Player.pos_x, 
            y: Player.pos_y + (Player.playerSize * 2) // check the point that you're moving TO
        });
    }

    moveRight() {
        if (this.checkRight()) {
            Player.setPositionX(Player.pos_x + Globals.TILE_WIDTH);
            // player.update();
            // this.checkForEvent(player, this.game.map);
        }
    }

    checkRight() {
        return !this.checkCollision({
            x: Player.pos_x + (Player.playerSize * 2), 
            y: Player.pos_y
        });
    }


    moveLeft() {
        if (this.checkLeft()) {
            Player.setPositionX(Player.pos_x - Globals.TILE_WIDTH);
            // player.update();
            // this.checkForEvent(player, this.game.map);
        }
    }

    checkLeft() {
        return !this.checkCollision({
            x: Player.pos_x - Player.playerSize,
            y: Player.pos_y
        });
    }

    checkCollision(p) {
        for (let collisions of this.game.map.collisions.objects) {
            // return true if collides with collision rect or falls outside map bounds
            var collides =  this.isInBounds(p, collisions) || 
            p.y < 0 || 
            p.y > (Globals.MAP_HEIGHT * Globals.TILE_HEIGHT) ||
            p.x < 0 ||
            p.x > (Globals.MAP_WIDTH * Globals.TILE_WIDTH);
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
	    	//this.game.console.sendMessage(result);
    	}
    }

    checkForEvent(player, map) {
    	this.events = [];
    	for (let e of map.events) {
            // events are positioned at bottom left in Tiled....
    		if (e.x == player.pos_x && e.y == player.pos_y + Globals.TILE_HEIGHT) {
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