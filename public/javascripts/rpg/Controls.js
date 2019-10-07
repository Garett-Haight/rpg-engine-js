import Globals from './Globals'
import Player from './Player'
import Rectangle from './Rectangle'

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
            Player.setPositionY(Player.bounds.getY() - Globals.TILE_HEIGHT);
           // player.update();
           // this.checkForEvent(player, this.game.map);
        }
    }

    checkUp() {
        let up = new Rectangle(
            Player.bounds.getX(),
            Player.bounds.getY() - Player.movementSpeed,
            Globals.TILE_WIDTH,
            Globals.TILE_HEIGHT
        );
        return !this.checkCollisions(up);
    }

    moveDown() {
        if (this.checkDown()) {
            Player.setPositionY(Player.bounds.getY() + Globals.TILE_HEIGHT);
            //player.update();
           // this.checkForEvent(player, this.game.map);
        }
    }

    checkDown() {
        let down = new Rectangle(
            Player.bounds.getX(),
            Player.bounds.getY() + Player.movementSpeed,
            Globals.TILE_WIDTH,
            Globals.TILE_HEIGHT
        );
        return !this.checkCollisions(down);
    }

    moveRight() {
        if (this.checkRight()) {
            Player.setPositionX(Player.bounds.getX() + Globals.TILE_WIDTH);
            // player.update();
            // this.checkForEvent(player, this.game.map);
        }
    }

    checkRight() {
        let right = new Rectangle(
            Player.bounds.getX() + Player.movementSpeed,
            Player.bounds.getY(),
            Globals.TILE_WIDTH,
            Globals.TILE_HEIGHT
        );
        return !this.checkCollisions(right);
    }


    moveLeft() {
        if (this.checkLeft()) {
            Player.setPositionX(Player.bounds.getX() - Globals.TILE_WIDTH);
            // player.update();
            // this.checkForEvent(player, this.game.map);
        }
    }

    checkLeft() {
        let left = new Rectangle(
            Player.bounds.getX() - Player.movementSpeed,
            Player.bounds.getY(),
            Globals.TILE_WIDTH,
            Globals.TILE_HEIGHT
        );
        return !this.checkCollisions(left);
    }

    checkCollisions(rect) {
        let collisions = this.game.map.collisions;
        let a = collisions.find(collision => rect.collidesWith(collision));
        return a;
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
    		if (e.x == player.bounds.getX() && e.y == player.bounds.getY() + Globals.TILE_HEIGHT) {
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