import GameMap from './GameMap';
import Controls from './Controls';
import Events from './Events';
import UI from './UI';
import Console from './Console';

export default class Game {
	constructor(container, map) {
        this.container = document.querySelector(container);
		this.player = null;
		this.mapList = {};
        this.map = new GameMap(map, this, true);
		this.controls = new Controls(this);
		this.events = new Events();
		this.ui = new UI(this);
        this.console = new Console();
        

        // create dom elements for game sections
        let top = document.createElement('div');
        top.id = "top";
        this.container.appendChild(top);

        let mapElement = document.createElement("canvas");
        mapElement.id = "map";
        top.appendChild(mapElement);

        let bottom = document.createElement('div');
        bottom.id = "bottom";
        this.container.appendChild(bottom);


		// starting inventory
		this.startingInventory = {potion: 1, mana: 1};
	}
}

