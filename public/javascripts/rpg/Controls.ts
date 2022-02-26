import ConfigMgr from '../core/ConfigMgr'
import Player from './Player'
import Rectangle from '../core/primitives/Rectangle'
import Events from '../core/events/Events'
import EventLib from '../core/events/EventLibrary'
import KeyboardInput from '../core/input/Keyboard'
import MouseInput from '../core/input/Mouse'
import GameMap from '../core/GameMap/GameMap'

export default class Controls {
    map: GameMap;
    events: Events[];
    
    constructor(map:GameMap) {
        this.map = map;
        // event listeners
        // TODO: Debounce input
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') { // Arrow Down
                // move down
                e.preventDefault();
                this.moveDown();
            } else if (e.key === 'ArrowRight') { // Arrow Right
                // move right
                e.preventDefault();
                this.moveRight();
            } else if (e.key === 'ArrowUp') { // Arrow Up
                // move up
                e.preventDefault();
                //moveUp(player);
                this.moveUp();
            } else if (e.key === 'ArrowLeft') { // Arrow Left
                // move left
                e.preventDefault();
                this.moveLeft();
            } else if (e.key === ' ') { // spacebar
            	this.interact(map);
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
           // this.checkForEvent(player, this.map);
        }
    }

    checkUp() {
        let up = new Rectangle(
            Player.getBounds().getX(),
            Player.getBounds().getY() - Player.getMovementSpeed(),
            ConfigMgr.getGlobal("TILE_WIDTH"),
            ConfigMgr.getGlobal("TILE_HEIGHT"),
        );
        return !this.checkCollisions(up);
    }

    moveDown() {
        if (this.checkDown()) {
            Player.setPositionY(Player.getBounds().getY() + Player.getMovementSpeed());
            //player.update();
           // this.checkForEvent(player, this.map);
        }
    }

    checkDown() {
        let down = new Rectangle(
            Player.getBounds().getX(),
            Player.getBounds().getY() + Player.getMovementSpeed(),
            ConfigMgr.getGlobal("TILE_WIDTH"),
            ConfigMgr.getGlobal("TILE_HEIGHT"),
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
            // this.checkForEvent(player, this.map);
        }
    }

    checkRight() {
        let right = new Rectangle(
            Player.getBounds().getX() + Player.getMovementSpeed(),
            Player.getBounds().getY(),
            ConfigMgr.getGlobal("TILE_WIDTH"),
            ConfigMgr.getGlobal("TILE_HEIGHT"),
        );
        return !this.checkCollisions(right);
    }


    moveLeft() {
        if (this.checkLeft()) {
            Player.setPositionX(Player.getBounds().getX() - Player.getMovementSpeed());
            // player.update();
            // this.checkForEvent(player, this.map);
        }
    }

    checkLeft() {
        let left = new Rectangle(
            Player.getBounds().getX() - Player.getMovementSpeed(),
            Player.getBounds().getY(),
            ConfigMgr.getGlobal("TILE_WIDTH"),
            ConfigMgr.getGlobal("TILE_HEIGHT")
        );
        return !this.checkCollisions(left);
    }

    checkCollisions(rect: Rectangle) {
        let collisions = this.map.collisions;
        let a = collisions.checkCollision(rect);
        return a;
    }

    interact(map) {
    	if(map.events.length > 0) {
    		var action = map.events[0]['properties'].find(prop => prop.name === "action");
            var properties = {};
            map.events[0].properties.forEach(prop => {
                properties[prop.name] = prop.value;
            });
            var result = EventLib.eventList[action.value](properties, this.map);
	    	// this.map.console.sendMessage(result);
    	}
    }

    checkForEvent(player, map) {
    	for (let e of map.events) {
            // events are positioned at bottom left in Tiled....
    		if (e.x == player.getBounds().getX() && e.y == player.getBounds().getY() + ConfigMgr.getGlobal('TILE_HEIGHT')) {
    			this.events.push(e);
    		}
    	}
    }

    toggleInventoryStatusPanel() {
        // var ui = this.game.ui;
        // if(!ui.isInventoryOpen) {
        //     ui.viewInventory();
        // }
        // else {
        //     ui.viewStatus();
        // } 
    }
}