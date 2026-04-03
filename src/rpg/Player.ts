import Globals from './Globals'
import TilesetService from '../core/services/TilesetService'
import TilesetStore from '../core/TilesetStore'
import Tileset from '../core/Tileset'
import SpriteStore from '../core/SpriteRepository'
import Sprite from '../core/Sprite'
import AnimatedSprite from '../core/AnimatedSprite'
import Rectangle from '../core/primitives/Rectangle'
import Config from './Config'
import Controls from './Controls'
import Game from './Game';
import ConfigMgr from '../core/ConfigMgr'
import IRenderable from '../core/Interfaces/IRenderable'
import IControllable from '../core/Interfaces/IControllable'

class Player implements IRenderable, IControllable {
	spriteStore: typeof SpriteStore
	builtGraphics: boolean
	currentAnimation: string
	static instance: any = null;
	playerSize: number
	movementSpeed: number
	facing: string
	private bounds: Rectangle
	hp: number
	mp: number
	inventory: any[]
	private controls: Controls;
	private animations: {
		default: AnimatedSprite;
		walkUp: AnimatedSprite;
		walkDown: AnimatedSprite;
		walkLeft: AnimatedSprite;
		walkRight: AnimatedSprite
	}
	game: typeof Game

	constructor(x: number, y: number) {
		console.log("player constructor called");
		if(!Player.instance) {
			this.init(x, y);
		}
		return Player.instance;
	};

	init(x: number, y: number) {
		console.log("building players....");
		this.spriteStore = SpriteStore;
		this.builtGraphics = false;
		this.loadTileset();
		this.currentAnimation = 'default';
		this.game = Game;
		this.controls = new Controls(this);
		this.controls.on('ArrowDown', (e: Event) => {
			e.preventDefault();
			this.moveDown();
		});
		this.controls.on('ArrowUp', (e: Event) => {
			e.preventDefault();
			this.moveUp();
		});
		this.controls.on('ArrowRight', (e: Event) => {
			e.preventDefault();
			this.moveRight();
		});
		this.controls.on('ArrowLeft', (e: Event) => {
			e.preventDefault();
			this.moveLeft();
		});

		Player.instance = this;
		this.playerSize = ConfigMgr.getGlobal('TILE_WIDTH');
		this.movementSpeed = 5;
		this.facing = Globals.FACING.DOWN;
		// player positioning
		this.bounds = new Rectangle(
			x, 
			y, 
			16, 
			32
		);

		// player attrs
		this.hp = 100;
		this.mp = 100;
		this.inventory = [];
	}

	setPosition(x, y) {
		this.setPositionX(x);
		this.setPositionY(y);
	}

	setPositionX(x) {
		this.bounds.setX(x);
	}

	setPositionY(y) {
		this.bounds.setY(y);
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

	async loadTileset() {
		let playerTileset = null;
		if (TilesetStore.exists("hero")) {
			playerTileset = TilesetStore.get("hero");
			this.buildGraphics(playerTileset);
		}
		else {
			// playerTileset = TilesetStore.add(new Tileset("DungeonTileset2")).then(() => {

			// });
			let playerTilesetRes:any = await TilesetService.getTileset("hero")
			let playerTilesetJSON = await playerTilesetRes.json();
			playerTileset = TilesetStore.add(new Tileset(playerTilesetJSON));
			this.buildGraphics(playerTileset);
			
		}
	}

	buildGraphics(playerTileset: Tileset):void {


		let playerIdle01 = new Sprite(playerTileset, 0, 0, 16, 32, "playerIdle01");
		let playerIdle02 = new Sprite(playerTileset, 16, 0, 16, 32, "playerIdle02");
		let playerIdle03 = new Sprite(playerTileset, 32, 0, 16, 32, "playerIdle03");

		this.spriteStore.add(playerIdle01);
		this.spriteStore.add(playerIdle02);
		this.spriteStore.add(playerIdle03);

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

		this.spriteStore.add(playerStepRight01);
		this.spriteStore.add(playerStepRight02);
		this.spriteStore.add(playerStepRight03);
		this.spriteStore.add(playerStepRight04);
		this.spriteStore.add(playerStepRight05);

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
		this.spriteStore.add(playerStepLeft01);
		this.spriteStore.add(playerStepLeft02);
		this.spriteStore.add(playerStepLeft03);
		this.spriteStore.add(playerStepLeft04);
		this.spriteStore.add(playerStepLeft05);

		let walkLeftAnimation = new AnimatedSprite([
			playerStepLeft01,
			playerStepLeft02,
			playerStepLeft03,
			playerStepLeft04,
			playerStepLeft05,
		], "walkLeft");

		this.animations = {
			default: idleAnimation,
			walkUp: idleAnimation,
			walkDown: idleAnimation,
			walkLeft: walkLeftAnimation,
			walkRight: walkRightAnimation
		};
		this.builtGraphics = true;
	}

	getCurrentAnimation() {
		return this.currentAnimation;
	}

	getAnimations() {
		return Object.keys(this.animations);
	}

	setCurrentAnimation(animation) {
		this.currentAnimation = animation;
	}

	getBounds() {
		return this.bounds;
	}

	getMovementSpeed() {
		return this.movementSpeed;
	}

	update() {
		
	}

	render(ctx:CanvasRenderingContext2D, time:DOMHighResTimeStamp) {
		this.animations[this.currentAnimation].render(
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