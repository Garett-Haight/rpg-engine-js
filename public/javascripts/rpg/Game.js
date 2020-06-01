import { ConfigMgr, Globals, Config } from '../core/ConfigMgr'
import GlobalsFile from './Globals'
import ConfigFile from './Config'
import Map from '../core/Map'
import UI from '../core/UI/index'
import Controls from './Controls'
//import Player from './Player'
import MapStore from '../core/MapStore'
import MapService from '../core/services/MapService'
import Tileset from '../core/Tileset'
import TilesetStore from '../core/TilesetStore'
import TilesetService from '../core/services/TilesetService'
import Events from '../core/Events'
import Scene from '../core/Scene'
import Viewport from '../core/Viewport'
import Console from './Console'
import Rectangle from '../core/primitives/Rectangle'
import Config from './Config'

export default class Game {
	constructor() {
		ConfigMgr.addGlobals(GlobalsFile);
		ConfigMgr.addConfigs(ConfigFile);

        this.container = document.querySelector(Config.container);
		//this.player = Player;
		this.viewports = [];
		this.mapStore = MapStore;

		// should this be a singleton?
		this.mapService = new MapService();
		this.tilesetService = new TilesetService();
		this.map = new Map(Config.firstMap, true, this.mapService);
		
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

		// this.tilesetService.getTileset('0x72_DungeonTilesetII_v1.3').then((t) => {
		// 	console.log(t);
			
		// });
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

