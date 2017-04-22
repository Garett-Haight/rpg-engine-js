class Map {
	constructor(map, game, drawMap=false) {
        this.game = game;
        this.player = game.player;
        this.promise = this.getMap(map, drawMap);
		this.mapName = map;
		this.collisions = [];
		this.events = [];
	}

	getMap(mapName, drawMap) {
		var mapObj = this;

		// check if map has already been loaded to mapList
		var mapPromise = new Promise((resolve, reject) => {
			if (!this.game.mapList[mapName]) {
				var request = new XMLHttpRequest();
				request.open('Get', '/maps/' + mapName + '.json');
				request.onreadystatechange = function() {
					if(request.readyState === 4) {
						if(request.status === 200) {
							resolve(JSON.parse(request.responseText));
						}
						else {
							reject("Something went wrong.");
						}
					}
				};
				request.send();
			}
			else {
				resolve(this.game.mapList[mapName].map);
			}
		});

		mapPromise.then((response) => {
			mapObj.map = response;
            this.mapName = mapName;
            if (drawMap) {
				mapObj.drawMap();
				mapObj.drawEntities();
				mapObj.parseCollisions();
				mapObj.parseEvents();
				mapObj.drawEvents();
			}
		});

		return mapPromise;
	}

	loadMap(mapName, args) {
		// update mapList with current version of the map
		// should probably do this for events, etc. too
		this.game.mapList[this.mapName] = this;

		var mapPromise = this.getMap(mapName, true);

		mapPromise.then(() => {
            var entitiesContainer = document.querySelector('#entities');
            this.placePlayer(entitiesContainer, args);
		});

	}

	drawMap (container="#map") {
		var map = this.map;
		var tiles = map.layers[0].data;
		var mapElement = document.querySelector(container);

		// clear map element contents when new map is loaded
		while(mapElement.firstChild){
			mapElement.removeChild(mapElement.firstChild);
		}

		for (let i = 0; i < map.height; i++) {
			var rowElement = document.createElement('ul');
			rowElement.className = 'row';
			mapElement.appendChild(rowElement);
			for(let j = 0; j < map.width; j++) {
				var tileElement = document.createElement('li');
				tileElement.className = 'tile tile_' + tiles[(i*GLOBALS.MAP_WIDTH) + j];
				rowElement.appendChild(tileElement);
			}
			this.tilesDrawn = true;
		}
	}

	parseCollisions() {
		var collisions = [];
		for ( let layer of this.map.layers ) {
			if (layer.name == "Collisions") {
				for (let i = 0; i < GLOBALS.MAP_HEIGHT; i++) {
					var cells = [];
					for (let j = 0; j < GLOBALS.MAP_WIDTH; j++) {
						cells.push(layer.data[(i*GLOBALS.MAP_WIDTH)+j]);
					}
					collisions.push(cells);
				}
			}
		}
		this.collisions = collisions;
	}

	// Events are items, map teleports, etc.
	parseEvents() {
		var events;
		for (let layer of this.map.layers ) {
			if (layer.name == "Events") {
				events = layer.objects;
			}
		}
		this.events = events;
	}

	drawEvents() {
		var entitiesContainer = document.querySelector('#entities');
		if(this.events.length > 0) {
			for(let e of this.events) {
				if (e.visible) {
					var eventElem = document.createElement("div");
					eventElem.id = "item_" + e.id;
					eventElem.className = "item";
					eventElem.style.top = e.y - GLOBALS.TILE_HEIGHT + "px";
					eventElem.style.left = e.x + "px";
					entitiesContainer.appendChild(eventElem);
				}
			}
		}
	}

	// Entities are players, mobs, and NPCs
	drawEntities (container="#map") {
		var map = this.map;
		var mapElement = document.querySelector(container);
		for (let layer of map.layers) {
			if (layer.name == "Entities") {
				if (this.tilesDrawn) {
					var entitiesContainer;
					if (!(entitiesContainer = document.querySelector('#entities'))) {
						entitiesContainer = document.createElement('div');
						entitiesContainer.id = "entities";
						mapElement.appendChild(entitiesContainer);
					}

					for (let e of layer.objects) {
						// Tiled positions objects at bottom left instead of top left
						e.y = e.y - GLOBALS.TILE_HEIGHT;
						if (e.name == "Player") {
							this.placePlayer(entitiesContainer, {x: e.x, y: e.y});
						}
					}
				}
			}
		}
	}

	placePlayer(container, args) {
        var playerElem;
        if ( !(playerElem = document.querySelector("#entities #player")) ) {
            playerElem = document.createElement("div");
            playerElem.id = "player";
            container.appendChild(playerElem);
        }

        if(!this.game.player) {
            this.game.player = new Player(playerElem, {x: args.x, y: args.y});
        }
        else {
        	this.game.player.elem = playerElem;
        	this.game.player.pos_x = args.x;
        	this.game.player.pos_y = args.y;
        	this.game.player.update();
		}

	}
}