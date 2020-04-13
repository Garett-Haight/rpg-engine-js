import Globals from './Globals'
import TilesetStore from './TilesetStore'
import Tileset from './Tileset'
import SpriteStore from './SpriteStore'
import Sprite from './Sprite'
import AnimatedSprite from './AnimatedSprite'
import Rectangle from './primitives/Rectangle'
import Config from './Config'
import Tileset from './Tileset'

class Player {
	constructor(x, y) {
		this.spriteStore = SpriteStore;
		this._builtGraphics = false;
		if(!Player.instance) {
			Player.instance = this;
			this._playerSize = Globals.TILE_WIDTH;
			this._movementSpeed = 5;
			this._facing = Globals.FACING.DOWN;
			// player positioning
			this._bounds = new Rectangle(
				x, 
				y, 
				16, 
				20
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
		}
		return Player.instance;
	};

	buildGraphics() {
		let playerTileset = null;
		if (TilesetStore.exists("DungeonTileset2")) {
			playerTileset = TilesetStore.get("DungeonTileset2");
		}
		else {
			playerTileset = TilesetStore.add(new Tileset("DungeonTileset2"));
		}
		let spriteArr = this.spriteStore.add(
			[
				new Sprite(playerTileset, 144, 44, 16, 20, "playerIdle01"),
				new Sprite(playerTileset, 160, 44, 16, 20, "playerIdle02"),
				new Sprite(playerTileset, 176, 44, 16, 20, "playerIdle03"),
				new Sprite(playerTileset, 182, 44, 16, 20, "playerIdle04")
			]
		);

		let animation = new AnimatedSprite(spriteArr);
		this._animations = {
			walkUp: animation,
			walkDown: animation,
			walkLeft: animation,
			walkRight: animation
		};
		this._builtGraphics = true;
	}

	getBounds() {
		return this._bounds;
	}

	getMovementSpeed() {
		return this._movementSpeed;
	}

	update() {
		
	}

	render(ctx, time) {
		this._animations.walkUp.render(
			ctx, 
			this.getBounds().getX(), 
			this.getBounds().getY(),
			this.getBounds().getWidth(),
			this.getBounds().getHeight(),
			1, 
			time
		);

		// for collision debugging
		if (Config.renderPlayerBounds) {
			ctx.strokeStyle = "green";
			ctx.strokeRect(
				this.getBounds().getX(), 
				this.getBounds().getY(), 
				this.getBounds().getWidth(), 
				this.getBounds().getHeight()
			);
		}
	}
}

const instance = new Player();
// Object.freeze(instance);

export default instance;