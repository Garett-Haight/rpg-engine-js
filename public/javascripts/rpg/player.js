import Globals from './Globals'
import TilesetStore from './TilesetStore'
import AnimatedSprite from './AnimatedSprite'

class Player {
	constructor() {
		if(!Player.instance) {
			Player.instance = this;
			this.tilesDrawn = false;
			this.playerSize = Globals.TILE_WIDTH;
			this.animations = {
				walkUp: null,
				walkDown: null,
				walkLeft: null,
				walkRight: null
			};
	
			// player positioning
			this.pos_x = null;
			this.pos_y = null;
	
			// player attrs
			this.hp = 100;
			this.mp = 100;
			this.inventory = {};

			this.setPosition = function(x, y) {
				this.pos_x = x;
				this.pos_y = y;
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
					this.pos_x, 
					this.pos_y,
					sprite.tileset.tileWidth,
					sprite.tileset.tileHeight
				);
			}
		}
		return Player.instance;
	};

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