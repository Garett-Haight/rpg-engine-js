import Globals from './Globals'
import TilesetStore from './TilesetStore'
import Sprite from './Sprite'
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
				let tileset = TilesetStore.get('DungeonTileset2');
				let coords = tileset.getTileCoords(107);
				return {tileset, coords};
			}

			this.render = function(ctx) {
				let sprite = this.getPlayerSprite();
				// new Sprite(sprite.tileset, sprite.coords.x, sprite.coords.y, 16, 32, ctx);
				ctx.drawImage(
					sprite.tileset.getTilesetImage(), 
					sprite.coords.x,
					sprite.coords.y,
					sprite.tileset.getTileWidth(),
					sprite.tileset.getTileHeight(),
					this.getBounds().getX(),
					this.getBounds().getY(),
					sprite.tileset.getTileWidth(),
					sprite.tileset.getTileHeight()
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

	update() {
		
	}
}

const instance = new Player();
// Object.freeze(instance);

export default instance;