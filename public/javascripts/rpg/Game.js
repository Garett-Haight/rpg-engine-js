import GameMap from './GameMap'
import Controls from './Controls'
import MapStore from './MapStore'
import MapService from './services/MapService'
import Events from './Events'
import Viewport from './Viewport'
import UI from './UI'
import Console from './Console'

export default class Game {
	constructor(Config) {
        this.container = document.querySelector(Config.container);
		this.player = null;
		this.viewports = [];
		this.mapStore = MapStore;
		//this.mapStore.add();
		
		// should this be a singleton?
		this.mapService = new MapService();
		this.map = new GameMap(Config.firstMap, true, this.mapService);
		
		this.controls = new Controls(this);
		this.events = new Events();
		this.ui = new UI(this);     
		
        // create dom elements for game sections
		let top = UI.createPanel("top", this.container);
		let mapViewport = new Viewport("map", top, 20, 20, this.map);
		this.viewports.push(mapViewport);

		let bottom = UI.createPanel("bottom", this.container);
		this.console = new Console(bottom);
		this.console.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");

		// starting inventory
		this.startingInventory = {potion: 1, mana: 1};

		document.addEventListener('click', this.loop.bind(this));
	//	this.loop();
	}

	loop() {
		this.render();
	}

	render() {
		this.viewports.forEach((vp) => {
			vp.render();
		});
	}


}

