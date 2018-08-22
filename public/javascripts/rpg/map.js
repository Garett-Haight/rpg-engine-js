import Player from "./player";
import Tilesets from "./Tilesets"
import Tileset from "./Tileset"

export default class GameMap {
	constructor(map, game, drawMap=false) {
        this.game = game;
        this.player = game.player;
        this.promise = this.getMap(map, drawMap);
		this.mapName = map;
		this.loadedTiles = [];
	}

	getMap(mapId, drawMap) {

        // Clear current maps
        this.map = null;
        this.collisions = null;
        this.events = null;

		// check if map has already been loaded to mapList
		var mapPromise = new Promise((resolve, reject) => {
			if (!this.game.mapList[mapId]) {
				var request = new XMLHttpRequest();
				request.open('Get', '/maps/map' + mapId + '_new.json');
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
				resolve(this.game.mapList[mapId]);
			}
		});

		mapPromise.then((response) => {
            this.mapName = mapId;
            if(!this.game.mapList[mapId]) {
            	// non-cached response returns JSON which needs to be parsed
				this.map = response;
				this.getTilesets();
                this.parseEvents();
            }
            else {
            	// cached response returns an object,
				// we can skip the parsing functions and assign values from stored arrays/objects
                this.map = response.map;
                this.collisions = response.collisions;
                this.events = response.events;
            }

            if (drawMap) {
				var self = this;
				this.tilesets.Tilesets.forEach(tileset => {
					// There has got to be a better way to do this
					// Maybe the constructor for each Tileset could return a promise instead of
					// handling it here

					new Promise((resolve, reject) => {
						tileset.Tileset.tilesetImage.onload = function() {
							resolve(tileset.Tileset.name);
						}
					}).then(response => {
						self.loadedTiles.push(response);
						console.log(response);
						if	(self.loadedTiles.length == this.tilesets.Tilesets.length) { // when tiles are downloaded, we can render the map
							console.log("rendering!");
							self.render();
						}
					});	
				}); 
			}
		});

		return mapPromise;
	}

	loadMap(mapId, args) { // bit of a misnomer... this seems to be more for teleporting to new maps
		// update mapList with current version of the map
		this.game.mapList[this.mapName] = Object.assign(Object.create(this), this);

		var mapPromise = this.getMap(mapId, true);

		mapPromise.then(() => {
            var entitiesContainer = document.querySelector('#entities');
            this.placePlayer(entitiesContainer, args);
		});

	}

	drawMap (container="#map") {
		var map = this.map;
		var tiles = map.layers[0].data;
		var mapElement = document.querySelector(container);
		var ctx = mapElement.getContext("2d");
		// Clear previous render
		ctx.clearRect(0,0, GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH, GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT);

		mapElement.width = GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH;
		mapElement.height = GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT;
		map.width = GLOBALS.MAP_WIDTH;
		map.height = GLOBALS.MAP_HEIGHT;
		
		for (let i = 0; i < map.height; i++) {
			for(let j = 0; j < map.width; j++) {
				var tileCoords = this.tilesets.getTileCoordsById(tiles[(i*GLOBALS.MAP_WIDTH) + j] + 1);
				var image = this.tilesets.getTilesetImageById(tiles[(i*GLOBALS.MAP_WIDTH) + j] + 1); // gids start at 1 for some reason
				ctx.drawImage(
					image, 
					tileCoords.x, 
					tileCoords.y, 
					GLOBALS.TILE_WIDTH,
					GLOBALS.TILE_HEIGHT,
					j * GLOBALS.TILE_WIDTH, 
					i * GLOBALS.TILE_HEIGHT, 
					GLOBALS.TILE_WIDTH,
					GLOBALS.TILE_HEIGHT);
			}
			this.tilesDrawn = true;
		}
	}

	parseCollisions() {
		var collisions = [];
		for ( let layer of this.map.layers ) {
			if (layer.name == "Collisions") {
				for (let i = 0; i < layer.objects.length; i++) {
					collisions.push(layer.objects[i]);
				}
			}
		}
		this.collisions = collisions;
	}

	getTilesets() {
		var tilesets = [];
		for(let tileset of this.map.tilesets) {
			// This might cause some resource bloating... need to find a way to cache images
			// maybe embed them on the page and provide a dom reference?
			tilesets.push(new Tileset({
				name: tileset.name,
				src: tileset.image.split('\\').pop().split('/').pop(), 
				height: tileset.tileheight,
				width: tileset.tilewidth,
				firstgid: tileset.firstgid
			}));
		}
		this.tilesets = new Tilesets(tilesets);
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

	drawEvents(container=".top") {
		var eventsContainer;
        var mapElement = document.querySelector(container);

        if (!(eventsContainer = document.querySelector('#events'))) {
			eventsContainer = document.createElement("canvas");
			eventsContainer.id = "events";

            eventsContainer.width = GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH;
            eventsContainer.height = GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT;

            mapElement.appendChild(eventsContainer);
		}

		var ctx = eventsContainer.getContext("2d");
		ctx.clearRect(0,0, GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH, GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT);
        ctx.fillStyle = TILESET[5];

		if (this.events.length > 0) {
			for(let e of this.events) {
				if (e.visible) {
					ctx.fillRect(e.x, e.y - GLOBALS.TILE_HEIGHT, GLOBALS.TILE_WIDTH, GLOBALS.TILE_HEIGHT);
				}
			}
		}
	}

	// Entities are players, mobs, and NPCs
	drawEntities (container=".top") {
		var map = this.map;
		var mapElement = document.querySelector(container);
		for (let layer of map.layers) {
			if (layer.name == "Entities") {
				if (this.tilesDrawn) {
					var entitiesContainer;
					if (!(entitiesContainer = document.querySelector('#entities'))) {
						entitiesContainer = document.createElement('canvas');
						entitiesContainer.id = "entities";

						entitiesContainer.width = GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH;
						entitiesContainer.height = GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT;
						mapElement.appendChild(entitiesContainer);

					}

                    var ctx = entitiesContainer.getContext("2d");
                    ctx.clearRect(0,0, GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH, GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT);
					
					for (let e of layer.objects) {
						// Tiled positions objects at bottom left instead of top left
						e.y = e.y - GLOBALS.TILE_HEIGHT;
						if (e.name == "Player" && !this.game.player) {
							this.placePlayer(entitiesContainer, {x: e.x, y: e.y});
						}
					}
				}
			}
		}
	}

	placePlayer(container, args) {
        if(!this.game.player) {
            this.game.player = new Player(container, this.game, {x: args.x, y: args.y});
        }
        else {
        	this.game.player.canvas = container;
        	this.game.player.pos_x = args.x;
        	this.game.player.pos_y = args.y;
        	this.game.player.update();
		}
	}

	render() {
        this.drawMap();
        if(!this.collisions) {
            this.parseCollisions();
        }

        // no need to parse events twice
        if (!this.events) {
            this.parseEvents();
        }
        this.drawEvents();
        this.drawEntities();
    }
}