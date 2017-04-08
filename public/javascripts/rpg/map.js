class Map {
	constructor(map, game, drawMap=false) {
		this.request = this.getMap(map, drawMap);
		this.player = game.player;
		this.game = game;
		this.mapName = map;
		this.collisions = [];
		this.events = [];
	}

	getMap(mapName, drawMap) {
		var mapObj = this;
		var request = new XMLHttpRequest();
		request.open('Get', '/maps/' + mapName + '.json');
		request.onreadystatechange = function() {
				if(request.readyState === 4) {
					if(request.status === 200) {
						mapObj.map = JSON.parse(request.responseText);
						if(drawMap) {
							mapObj.drawMap();
							mapObj.drawEntities();
							mapObj.parseCollisions();
							mapObj.parseEvents();
						}
					}
					else{
						console.error("Something went wrong.");
					}
				}
			};
		request.send();
		return request;
	}

	drawMap (container="#map") {
		var map = this.map;
		var tiles = map.layers[0].data;
		var mapElement = document.querySelector(container);

		// clear map element contents when new map is loaded
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

	parseEvents() {
		var events;
		for (let layer of this.map.layers ) {
			if (layer.name == "Events") {
				events = layer.objects;
			}
		}
		this.events = events;
	}

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
							var playerElem;
							if ( !(playerElem = document.querySelector("#entities #player")) ) {
								playerElem = document.createElement("div");
								playerElem.id = "player";
								entitiesContainer.appendChild(playerElem);
							}
							this.game.player = new Player(playerElem, {x: e.x, y: e.y});
						}
					}
				}
			}
		}
	}
}