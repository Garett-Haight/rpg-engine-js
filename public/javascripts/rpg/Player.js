import Globals from './Globals'
import TilesetStore from './TilesetStore'
import AnimatedSprite from './AnimatedSprite'
import Rectangle from './Rectangle'

class Player {
	constructor(x, y) {
		if(!Player.instance) {
			Player.instance = this;
			this._playerSize = Globals.TILE_WIDTH;
			this._movementSpeed = Globals.TILE_WIDTH;

			this._facing = Globals.FACING.DOWN;
			this._animations = {
				walkUp: null,
				walkDown: null,
				walkLeft: null,
				walkRight: null
			};
	
			// player positioning
			this._bounds = new Rectangle(
				x, 
				y, 
				this._playerSize, 
				this._playerSize
			);

			// player attrs
			this.hp = 100;
			this.mp = 100;
			this.inventory = [];

			this.setPosition = function(x, y) {
				this.setPositionX(x);
				this.setPositionY(y);
			}

			this.setPositionX = function(x) {
				this._bounds.setX(x);
			}

			this.setPositionY = function(y) {
				this._bounds.setY(y);
			}

			this.getPlayerSprite = function() {
				let tileset = TilesetStore.get('DungeonEntities');
				let coords = tileset.getTileCoords(250);
				return {tileset, coords};
			}

			this.render = function(ctx) {
				let sprite = this.getPlayerSprite();
				ctx.drawImage(
					sprite.tileset.tilesetImage, 
					sprite.coords.x,
					sprite.coords.y,
					sprite.tileset.tileWidth,
					sprite.tileset.tileHeight,
					this.getBounds().getX(), 
					this.getBounds().getY(),
					sprite.tileset.tileWidth,
					sprite.tileset.tileHeight
				);
			}
		}
		return Player.instance;
	};

	getBounds() {
		return this._bounds;
	}

	getMovementSpeed() {
		return this._movementSpeed;
	}

	draw() {
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle = "#ffa464";
		ctx.fillRect(this.pos_x, this.pos_y, Globals.TILE_WIDTH, Globals.TILE_HEIGHT);
	}

	update() {
		
	}
}

const instance = new Player();
// Object.freeze(instance);

export default instance;