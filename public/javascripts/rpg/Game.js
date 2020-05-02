import GameMap from './GameMap'
import Controls from './Controls'
//import Player from './Player'
import MapStore from './MapStore'
import MapService from './services/MapService'
import Tileset from './Tileset'
import TilesetStore from './TilesetStore'
import TilesetService from './services/TilesetService'
import Events from './Events'
import Scene from './Scene'
import Viewport from './Viewport'
import UI from './UI'
import Console from './Console'
import Rectangle from './primitives/Rectangle'

export default class Game {
	constructor(Config) {
        this.container = document.querySelector(Config.container);
		//this.player = Player;
		this.viewports = [];
		this.mapStore = MapStore;

		// should this be a singleton?
		this.mapService = new MapService();
		this.tilesetService = new TilesetService();
		this.map = new GameMap(Config.firstMap, true, this.mapService);
		
		this.controls = new Controls(this);
		this.events = new Events();
		this.ui = new UI(this);     
		
        // create dom elements for game sections
		let top = UI.createPanel("top", this.container);
		//TODO: How would I handle this using Tiled?
		let topScene = new Scene([
			this.map
		]);
		let mapViewport = new Viewport("map", top, 20, 20, topScene);
		this.viewports.push(mapViewport);

		let bottom = UI.createPanel("bottom", this.container);
		this.console = new Console(bottom);
		this.console.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");

		// starting inventory
		this.startingInventory = {potion: 1, mana: 1};

		this.tilesetService.getTileset('0x72_DungeonTilesetII_v1.3').then((t) => {
			console.log(t);
			
		});
		this.loop(0);
	}

	
	loop(time) {
		window.requestAnimationFrame(this.loop.bind(this));
		this.render(time);
	}

	render(time) {
		this.viewports.forEach((vp) => {
			vp.render(time);
		});
	}


}

