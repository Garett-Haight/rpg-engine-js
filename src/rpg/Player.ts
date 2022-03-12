import Globals from './Globals'
import TilesetService from '../core/services/TilesetService'
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
			this.init(x, y);
		}
		return Player.instance;
	};

	init(x, y) {
		console.log("building players....");
		this._spriteStore = SpriteStore;
		this._builtGraphics = false;
		this.loadTileset();
		this._currentAnimation = 'default';
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
		let tileset = TilesetStore.get('hero');
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
			if (this.getCurrentAnimation() !== 'walkLeft') {
                this.setCurrentAnimation('walkLeft');
            }
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

	loadTileset() {
		let playerTileset = null;
		if (TilesetStore.exists("hero")) {
			playerTileset = TilesetStore.get("hero");
			this.buildGraphics(playerTileset);
		}
		else {
			// playerTileset = TilesetStore.add(new Tileset("DungeonTileset2")).then(() => {

			// });
			TilesetService.getTileset("hero").then((res) => {
				playerTileset = TilesetStore.add(new Tileset(res.data));
				this.buildGraphics(playerTileset);
			})
		}
	}

	buildGraphics(playerTileset: Tileset):void {


		let playerIdle01 = new Sprite(playerTileset, 0, 0, 16, 32, "playerIdle01");
		let playerIdle02 = new Sprite(playerTileset, 16, 0, 16, 32, "playerIdle02");
		let playerIdle03 = new Sprite(playerTileset, 32, 0, 16, 32, "playerIdle03");

		this._spriteStore.add(playerIdle01);
		this._spriteStore.add(playerIdle02);
		this._spriteStore.add(playerIdle03);

		let idleAnimation = new AnimatedSprite([
			playerIdle01,
			playerIdle02,
			playerIdle03,
			playerIdle02
		], "default");

		let playerStepRight01 = new Sprite(playerTileset, 48, 0, 16, 32, "playerStepRight01");
		let playerStepRight02 = new Sprite(playerTileset, 64, 0, 16, 32, "playerStepRight02");
		let playerStepRight03 = new Sprite(playerTileset, 80, 0, 16, 32, "playerStepRight03");
		let playerStepRight04 = new Sprite(playerTileset, 96, 0, 16, 32, "playerStepRight04");
		let playerStepRight05 = new Sprite(playerTileset, 112, 0, 16, 32, "playerStepRight05");

		this._spriteStore.add(playerStepRight01);
		this._spriteStore.add(playerStepRight02);
		this._spriteStore.add(playerStepRight03);
		this._spriteStore.add(playerStepRight04);
		this._spriteStore.add(playerStepRight05);

		let walkRightAnimation = new AnimatedSprite([
			playerStepRight01,
			playerStepRight02,
			playerStepRight03,
			playerStepRight04,
			playerStepRight05
		], "walkRight");

		let playerStepLeft01 = new Sprite(playerTileset, 48, 32, 16, 32, "playerStepLeft01");
		let playerStepLeft02 = new Sprite(playerTileset, 64, 32, 16, 32, "playerStepLeft02");
		let playerStepLeft03 = new Sprite(playerTileset, 80, 32, 16, 32, "playerStepLeft03");
		let playerStepLeft04 = new Sprite(playerTileset, 96, 32, 16, 32, "playerStepLeft04");
		let playerStepLeft05 = new Sprite(playerTileset, 112, 32, 16, 32, "playerStepLeft05");
		this._spriteStore.add(playerStepLeft01);
		this._spriteStore.add(playerStepLeft02);
		this._spriteStore.add(playerStepLeft03);
		this._spriteStore.add(playerStepLeft04);
		this._spriteStore.add(playerStepLeft05);

		let walkLeftAnimation = new AnimatedSprite([
			playerStepLeft01,
			playerStepLeft02,
			playerStepLeft03,
			playerStepLeft04,
			playerStepLeft05,
		], "walkLeft");

		this._animations = {
			default: idleAnimation,
			walkUp: idleAnimation,
			walkDown: idleAnimation,
			walkLeft: walkLeftAnimation,
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

export default Player;