import Globals from './Globals'
import TilesetStore from '../core/TilesetStore'
import Tileset from '../core/Tileset'
import SpriteStore from '../core/SpriteStore'
import Sprite from '../core/Sprite'
import AnimatedSprite from '../core/AnimatedSprite'
import Rectangle from '../core/primitives/Rectangle'
import Config from './Config'

class Player {
	constructor(x, y) {
		this._spriteStore = SpriteStore;
		this._builtGraphics = false;
		this._currentAnimation = 'default';
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

		let playerIdle01 = new Sprite(playerTileset, 128, 32, 16, 32, "playerIdle01");
		let playerIdle02 = new Sprite(playerTileset, 144, 32, 16, 32, "playerIdle02");
		let playerIdle03 = new Sprite(playerTileset, 160, 32, 16, 32, "playerIdle03");

		this._spriteStore.add(playerIdle01);
		this._spriteStore.add(playerIdle02);
		this._spriteStore.add(playerIdle03);

		let idleAnimation = new AnimatedSprite([
			playerIdle01,
			playerIdle02,
			playerIdle03,
			playerIdle02
		]);

		let playerStepRight01 = new Sprite(playerTileset, 192, 32, 16, 32, "playerStepRight01");
		let playerStepRight02 = new Sprite(playerTileset, 224, 32, 16, 32, "playerStepRight02");
		let playerStepRight03 = new Sprite(playerTileset, 240, 32, 16, 32, "playerStepRight03");

		this._spriteStore.add(playerStepRight01);
		this._spriteStore.add(playerStepRight02);
		this._spriteStore.add(playerStepRight03);

		let walkRightAnimation = new AnimatedSprite([
			playerIdle01,
			playerStepRight01,
			playerStepRight02,
			playerStepRight03
		]);

		this._animations = {
			default: idleAnimation,
			walkUp: idleAnimation,
			walkDown: idleAnimation,
			walkLeft: idleAnimation,
			walkRight: walkRightAnimation
		};
		this._builtGraphics = true;
	}

	getCurrentAnimation() {
		return this._currentAnimation;
	}

	getAnimations() {
		return Object.keys(this._animations);
	}

	setCurrentAnimation(animation) {
		this._currentAnimation = animation;
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
		this._animations[this._currentAnimation].render(
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