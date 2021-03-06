/** Game Module
 * @module Game 
 */
import { ConfigMgr, Globals, Config } from '../core/ConfigMgr'
import buildGameObject from '../core/GameObjects/BuildGameObject'
import GlobalsFile from './Globals'
import UI from '../core/UI/index'
import Controls from './Controls'
//import Player from './Player'
import MapStore from '../core/MapStore'
import Events from '../core/events/Events'
import Scene from '../core/Scene'
import Viewport from '../core/Viewport'
import Console from './Console'

/** class representing the Game */
class Game {
	/**
	 * Create Game
	 * @param {Object} Config Contains configuration values for game
	 */
	constructor(Config) {
		ConfigMgr.addGlobals(GlobalsFile);

        this.container = document.querySelector(Config.container);
		this.controls = new Controls(this);
		this.events = new Events();
		this.ui = new UI(this);

		this.viewports = [];
		this.mapStore = MapStore;

		var player = buildGameObject({
			key: 'player_start',
			type: 'player'
		});

		MapStore.get(Config.firstMap).then((map) => {
			let topScene = new Scene([
				map
			], 'topScene');
			let mapViewport = new Viewport(top, 20, 20, topScene, 'topCanvas');
			this.viewports.push(mapViewport);
		});

        // create dom elements for game sections
		let top = UI.createPanel("top", this.container);
		let bottom = UI.createPanel("bottom", this.container);
		this.console = new Console(bottom);
		this.console.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");

		this.loop(0);
	}

	/**
	 * Game loop function 
	 * @param {DOMHighResTimeStamp} time 
	 */
	loop(time) {
		window.requestAnimationFrame(this.loop.bind(this));
		this.render(time);
	}

	/**
	 * Renders each Viewport object in Game
	 * @param {DOMHighResTimeStamp} time 
	 */
	render(time) {
		this.viewports.forEach((vp) => {
			vp.render(time);
		});
	}
}

export default Game;

