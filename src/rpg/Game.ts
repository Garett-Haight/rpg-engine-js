/** Game Module
 * @module Game 
 */
import ConfigMgr from '../core/ConfigMgr'
import GlobalsFile from './Globals'
import UI from '../core/UI/index'
import Controls from './Controls'
ConfigMgr.addGlobals(GlobalsFile);

import Player from './Player'
import MapRepository from '../core/MapRepository'
import Events from '../core/events/Events'
import Scene from '../core/Scene'
import Viewport from '../core/Viewport'
import Console from './Console'
import GameMap from '../core/GameMap/GameMap'
import { TilesetService, MapService } from '../core/services/index';
import Tileset from '../core/Tileset';
import TilesetStore from '../core/TilesetStore';
import AnimatedSprite from '../core/AnimatedSprite';
import Sprite from '../core/Sprite';



/** class representing the Game */
class Game {
	container: any
	controls: Controls
	events: Events
	ui: UI
	viewports: any[]
	MapRepository: typeof MapRepository
	textBox: Console
	protected player: Player;
	static activeViewport:Viewport;
	static activeScene:Scene;
	static instance: Game;
	static activeMap: GameMap
	/**
	 * Create Game
	 * @param {Object} Config Contains configuration values for game
	 */
	constructor(Config) {
		if (!Game.instance) {
			this.loadAssets();
			console.log("Building Game Object....");
			this.container = document.querySelector(Config.container);
			this.events = new Events();
			this.ui = new UI(this);
			this.viewports = [];
			this.MapRepository = MapRepository;
			this.player = new Player(144, 144);
			
			// create dom elements for game sections
			let top = UI.createPanel("top", this.container);
			let bottom = UI.createPanel("bottom", this.container);
			this.textBox = new Console(bottom);
			this.textBox.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");
			let mapViewport;
			TilesetService.getTileset('hero').then((res) => {
				let playerTileset = TilesetStore.add(new Tileset(res.data));
				let playerIdle01 = new Sprite(playerTileset, 0, 0, 16, 32, "playerIdle01");
				let playerIdle02 = new Sprite(playerTileset, 16, 0, 16, 32, "playerIdle02");
				let playerIdle03 = new Sprite(playerTileset, 32, 0, 16, 32, "playerIdle03");
				let idleAnimation = new AnimatedSprite([
					playerIdle01,
					playerIdle02,
					playerIdle03,
					playerIdle02
				], "default");
				MapRepository.get('loading').then((map:GameMap) => {
					
					Game.activeMap = map;
					let loadingScene = new Scene([map], 'loading');
					mapViewport = new Viewport(top, 20, 20, loadingScene, 'topCanvas');
					this.viewports.push(mapViewport);
				})
				.catch((e) => {
					console.error(e);
				});
			});

			// MapRepository.get(Config.firstMap).then((map:GameMap) => {
			// 	let topScene = new Scene([
			// 		map
			// 	], 'topScene');
			// 	Game.activeMap = map;
			// 	this.viewports.push(mapViewport);
			// 	mapViewport.setScene(topScene);
			// 	Game.activeViewport = mapViewport;
			// 	Game.activeScene = topScene;
			// 	topScene.add(this.player);
			// 	// this.controls = new Controls(this.map, Player);
			// });
	

			Game.instance = this;
			this.loop(0);
		}
		return Game.instance;
	}

	loadAssets() {
		let assets = [
			TilesetService.getTileset("DungeonTileset2"),
			TilesetService.getTileset("DungeonEntities"),
			TilesetService.getTileset("DungeonWalls")
		];

		Promise.all(assets).then((res) => {
			console.log(res);
			res.forEach((t) => TilesetStore.add(new Tileset(t.data)));
			console.log(TilesetStore);
		}).catch((e) => {
			console.log(e);
		});
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

