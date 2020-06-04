import { Globals } from '../core/ConfigMgr'
import Player from './Player'
import Rectangle from '../core/primitives/Rectangle'
import Events from '../core/events/Events'
import EventLib from '../core/events/EventLibrary'
import KeyboardInput from '../core/input/Keyboard'
import MouseInput from '../core/input/Mouse'

export default class Controls {
    constructor(game) {
        this.game = game;
        this.events = [];
        // event listeners
        // TODO: Debounce input
        document.addEventListener('keydown', (e) => {
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
            	this.interact(game.map);
            }
        });

        document.addEventListener('keyup', (e) => {
            Player.setCurrentAnimation('default');
        })
    }



    moveUp() {
        if (this.checkUp()) {
            Player.setPositionY(Player.getBounds().getY() - Player.getMovementSpeed());
           // player.update();
           // this.checkForEvent(player, this.game.map);
        }
    }

    checkUp() {
        let up = new Rectangle(
            Player.getBounds().getX(),
            Player.getBounds().getY() - Player.getMovementSpeed(),
            Globals.TILE_WIDTH,
            Globals.TILE_HEIGHT
        );
        return !this.checkCollisions(up);
    }

    moveDown() {
        if (this.checkDown()) {
            Player.setPositionY(Player.getBounds().getY() + Player.getMovementSpeed());
            //player.update();
           // this.checkForEvent(player, this.game.map);
        }
    }

    checkDown() {
        let down = new Rectangle(
            Player.getBounds().getX(),
            Player.getBounds().getY() + Player.getMovementSpeed(),
            Globals.TILE_WIDTH,
            Globals.TILE_HEIGHT
        );
        return !this.checkCollisions(down);
    }

    moveRight() {
        if (this.checkRight()) {
            if (Player.getCurrentAnimation() !== 'walkRight') {
                Player.setCurrentAnimation('walkRight');
            }
            Player.setPositionX(Player.getBounds().getX() + Player.getMovementSpeed());
            // player.update();
            // this.checkForEvent(player, this.game.map);
        }
    }

    checkRight() {
        let right = new Rectangle(
            Player.getBounds().getX() + Player.getMovementSpeed(),
            Player.getBounds().getY(),
            Globals.TILE_WIDTH,
            Globals.TILE_HEIGHT
        );
        return !this.checkCollisions(right);
    }


    moveLeft() {
        if (this.checkLeft()) {
            Player.setPositionX(Player.getBounds().getX() - Player.getMovementSpeed());
            // player.update();
            // this.checkForEvent(player, this.game.map);
        }
    }

    checkLeft() {
        let left = new Rectangle(
            Player.getBounds().getX() - Player.getMovementSpeed(),
            Player.getBounds().getY(),
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

    interact(map) {
    	if(map.events.length > 0) {
    		var action = map.events[0]['properties'].find(prop => prop.name === "action");
	    	var result = EventLib.eventList[action.name](this.events[0], this.game);
	    	this.game.console.sendMessage(result);
    	}
    }

    checkForEvent(player, map) {
    	this.events = [];
    	for (let e of map.events) {
            // events are positioned at bottom left in Tiled....
    		if (e.x == player.getBounds().getX() && e.y == player.getBounds().getY() + Globals.TILE_HEIGHT) {
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