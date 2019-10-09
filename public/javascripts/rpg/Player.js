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
				16, 
				32
			);

			// player attrs
			this._hp = 100;
			this._mp = 100;
			this._inventory = [];

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
				// let sprite = this.getPlayerSprite();
				let sprite = new Sprite(
					"DungeonTileset2", 
					144,
					32, 
					16, 
					32
				);

				ctx.drawImage(
					sprite.getTileset().getTilesetImage(),
					sprite.getX(),
					sprite.getY(),
					16, 
					32, 
					this.getBounds().getX(),
					this.getBounds().getY(),
					16,
					32
				);

				// ctx.drawImage(
				// 	sprite.getTileset().getTilesetImage(), 
				// 	sprite.getX(),
				// 	sprite.getY(),
				// 	sprite.getTileset().getTileWidth(),
				// 	sprite.getTileset().getTileHeight(),
				// 	this.getBounds().getX(),
				// 	this.getBounds().getY(),
				// 	sprite.getTileset().getTileWidth(),
				// 	sprite.getTileset().getTileHeight()
				// );
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