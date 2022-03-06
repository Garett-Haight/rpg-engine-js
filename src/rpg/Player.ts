import Globals from './Globals'
import TilesetStore from '../core/TilesetStore'
import Tileset from '../core/Tileset'
import SpriteStore from '../core/SpriteStore'
import Sprite from '../core/Sprite'
import AnimatedSprite from '../core/AnimatedSprite'
import Rectangle from '../core/primitives/Rectangle'
import Config from './Config'
import Controls from './Controls'
import Game from './Game';
import ConfigMgr from '../core/ConfigMgr'

class Player {
	_spriteStore: typeof SpriteStore
	_builtGraphics: boolean
	_currentAnimation: string
	static instance: any = null;
	_playerSize: number
	_movementSpeed: number
	_facing: string
	private _bounds: Rectangle
	_hp: number
	_mp: number
	_inventory: any[]
	private _controls: Controls;
	private _animations: {
		default: AnimatedSprite;
		walkUp: AnimatedSprite;
		walkDown: AnimatedSprite;
		walkLeft: AnimatedSprite;
		walkRight: AnimatedSprite
	}
	game: typeof Game

	constructor(x, y) {
		console.log("player constructor called");
		if(!Player.instance) {
			console.log("building players....");
			this._spriteStore = SpriteStore;
			this._builtGraphics = false;
			// this.buildGraphics();
			this._currentAnimation = 'default';
			let controlsMap = {

			};
			this.game = Game;
			this._controls = new Controls(this);
			this._controls.on('ArrowDown', (e: Event) => {
				e.preventDefault();
				this.moveDown();
			});
			this._controls.on('ArrowUp', (e: Event) => {
				e.preventDefault();
				this.moveUp();
			});
			this._controls.on('ArrowRight', (e: Event) => {
				e.preventDefault();
				this.moveRight();
			});
			this._controls.on('ArrowLeft', (e: Event) => {
				e.preventDefault();
				this.moveLeft();
			});

			Player.instance = this;
			this._playerSize = ConfigMgr.getGlobal('TILE_WIDTH');
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
		}
		return Player.instance;
	};

	setPosition(x, y) {
		this.setPositionX(x);
		this.setPositionY(y);
	}

	setPositionX(x) {
		this._bounds.setX(x);
	}

	setPositionY(y) {
		this._bounds.setY(y);
	}

	

	getPlayerSprite() {
		let tileset = TilesetStore.get('DungeonTileset2');
		let coords = tileset.getTileCoords(107);
		return {tileset, coords};
	}

	moveUp() {
        if (this.checkUp()) {
            this.setPositionY(this.getBounds().getY() - this.getMovementSpeed());
        }
    }

	checkUp() {
        let up = new Rectangle(
            this.getBounds().getX(),
            this.getBounds().getY() - this.getMovementSpeed(),
            ConfigMgr.getGlobal("TILE_WIDTH"),
            ConfigMgr.getGlobal("TILE_HEIGHT"),
        );
        return !this.checkCollisions(up);
    }

	moveDown() {
        if (this.checkDown()) {
            this.setPositionY(this.getBounds().getY() + this.getMovementSpeed());
        }
    }

	checkDown() {
        let down = new Rectangle(
            this.getBounds().getX(),
            this.getBounds().getY() + this.getMovementSpeed(),
            ConfigMgr.getGlobal("TILE_WIDTH"),
            ConfigMgr.getGlobal("TILE_HEIGHT"),
        );
        return !this.checkCollisions(down);
    }

	moveRight() {
        if (this.checkRight()) {
            if (this.getCurrentAnimation() !== 'walkRight') {
                this.setCurrentAnimation('walkRight');
            }
            this.setPositionX(this.getBounds().getX() + this.getMovementSpeed());
			console.log(this);
        }
    }

    checkRight() {
        let right = new Rectangle(
            this.getBounds().getX() + this.getMovementSpeed(),
            this.getBounds().getY(),
            ConfigMgr.getGlobal("TILE_WIDTH"),
            ConfigMgr.getGlobal("TILE_HEIGHT"),
        );
        return !this.checkCollisions(right);
    }

	moveLeft() {
        if (this.checkLeft()) {
            this.setPositionX(this.getBounds().getX() - this.getMovementSpeed());
        }
    }

    checkLeft() {
        let left = new Rectangle(
            this.getBounds().getX() - this.getMovementSpeed(),
            this.getBounds().getY(),
            ConfigMgr.getGlobal("TILE_WIDTH"),
            ConfigMgr.getGlobal("TILE_HEIGHT")
        );
        return !this.checkCollisions(left);
    }

	checkCollisions(rect: Rectangle) {
		return Game.activeMap.collisions.checkCollision(rect);
    }

	assignEntity(e) {
		this.setPosition(e.x, e.y);
	}

	buildGraphics():void {
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
		], "player-idle");

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
		], "player-walk-right");

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

	render(ctx:CanvasRenderingContext2D, time:number) {
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

const instance = new Player(144, 144);
console.log(instance);
export default instance;