import GameMap from './GameMap'
import Controls from './Controls'
import Player from './Player'
import MapStore from './MapStore'
import MapService from './services/MapService'
import Events from './Events'
import Scene from './Scene'
import Viewport from './Viewport'
import UI from './UI'
import Console from './Console'
import Rectangle from './primitives/Rectangle'

export default class Game {
	constructor(Config) {
        this.container = document.querySelector(Config.container);
		this.player = Player;
		this.viewports = [];
		this.mapStore = MapStore;

		// should this be a singleton?
		this.mapService = new MapService();
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

		let right = UI.createPanel("right", this.container);
		let rightScene = new Scene([
			new Rectangle({x1: 1, y1: 1, w: 100, h: 100})
		]);
		let menuViewport = new Viewport("menu", right, 20, 20, rightScene);
		this.viewports.push(menuViewport);

		let bottom = UI.createPanel("bottom", this.container);
		this.console = new Console(bottom);
		this.console.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");

		// starting inventory
		this.startingInventory = {potion: 1, mana: 1};

		this.loop(0);
	}

	
	loop(delta) {
		window.requestAnimationFrame(this.loop.bind(this));
		this.render();
	}

	render() {
		this.viewports.forEach((vp) => {
			vp.render();
		});
	}


}

