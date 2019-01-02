import GameMap from './GameMap';
import Controls from './Controls';
import Events from './Events';
import UI from './UI';
import Console from './Console';

export default class Game {
	constructor(Config) {
        this.container = document.querySelector(Config.container);
		this.player = null;
		this.mapList = {};
        this.map = new GameMap(Config.firstMap, this, true);
		this.controls = new Controls(this);
		this.events = new Events();
		this.ui = new UI(this);
        this.console = new Console();
        

        // create dom elements for game sections
        let top = UI.createPanel("top", this.container);
        let mapElement = UI.createCanvas("map", top);
        let bottom = UI.createPanel("bottom", this.container);

		// starting inventory
		this.startingInventory = {potion: 1, mana: 1};
	}
}

