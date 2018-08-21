/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tileset {
    constructor(tileset) { 
        this.name = tileset.src;
        this.tilesetImage = new Image();
        this.tilesetImage.src = GLOBALS.img_path + tileset.src;

        // Width and Height in tiles... should probably add in support for tiles that can scale from the base image
        this.tilesetWidth = tileset.width;
        this.tilesetHeight = tileset.height;

       this.getTileCoords = function(id) {
            var x = ((id) % (this.tilesetWidth) * GLOBALS.TILE_WIDTH);
            // Might be able to replace Math.floor with | 0 bitwise operation
            var y = Math.floor((id) / (this.tilesetWidth))  * GLOBALS.TILE_HEIGHT;
            return {x: x, y: y};
        }
        console.log(this.getTileCoords(0));
    }

    

    // getTilesetHeight() {
    //     return Math.floor(this.tilesetImage.height / GLOBALS.TILE_HEIGHT);
    // }

    // getTilesetWidth() {
    //     return Math.floor(this.tilesetImage.width / GLOBALS.TILE_WIDTH);
    // }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tileset;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NPC
{

    
}
/* unused harmony export default */


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// add quest support, duh
class Tilesets {
    constructor(Tilesets) { 
        this.Tilesets = [];
        Tilesets.forEach(element => {
            this.Tilesets.push({
                id: this.Tilesets.length,
                Tileset: element
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tilesets;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class UI{
	constructor(game) {
		this.game = game;
        this.container = document.querySelector('#menu');
        if (this.container === null) {
            this.container = document.createElement('div');
            this.container.id = "menu";
            document.querySelector(".top").appendChild(this.container);
        }

        this.inventoryOpen = false;
       	
        // status panels and controls are the default menu state
        this.statusPanel = document.createElement("div");
        this.statusPanel.id = "statusPanel";
        this.statusPanel.classList.add("panel");
        this.container.appendChild(this.statusPanel);

        // Inventory panel
        this.inv = document.createElement("div");
        this.inv.id = "inventoryPanel";
        this.inv.classList.add("panel");
        var itemList = document.createElement("ul");
        itemList.id = "itemList";
        this.inv.appendChild(itemList);
        this.inv.className = "hide panel";
        this.container.appendChild(this.inv);


       	var statusTable = document.createElement("table");
       	var tr = document.createElement("tr");
       	var td = document.createElement("td");
       	td.innerText = "HP: ";
       	statusTable.appendChild(tr);
       	tr.appendChild(td);

       	var td2 = document.createElement("td");
       	td2.innerText = "100/100";
       	tr.appendChild(td2);

       	statusPanel.appendChild(statusTable);

        this.controlsElement = document.createElement("div");
        this.controlsElement.id = "controls";
        this.controlsElement.classList.add("panel");
        this.container.appendChild(this.controlsElement);

        var arrowDiv = document.createElement("div");
        var actionDiv = document.createElement("div");
        this.controlsElement.appendChild(arrowDiv);
        this.controlsElement.appendChild(actionDiv);

        this.createButton("Check", "checkButton", actionDiv, "interact");
        this.createButton("Inventory", "invButton", actionDiv, "toggleInventoryStatusPanel");

        this.createButton("▲", "upArrowButton", arrowDiv, "moveUp");
        this.createButton("◀", "leftArrowButton", arrowDiv, "moveLeft");
        this.createButton("▶", "rightArrowButton", arrowDiv, "moveRight");
        this.createButton("▼", "downArrowButton", arrowDiv, "moveDown");

	}


	createButton(text, id, appendTo=this.container, func) {
        var button = document.createElement("button");
        button.innerText = text;
        button.id = id;
        appendTo.appendChild(button);
        if ( typeof this.game.controls[func] !== 'undefined') {
        	button.addEventListener(
        		'click', 
        		function(e) {
                    this.game.controls[func](this.game.player);
                     // keep button from taking focus
                    document.getElementById(button.id).blur();
        		}.bind(this)
        	);
        }
    }

    viewInventory() {
        // update the inventory list
        this.updateInventory();

        // show the inventory panel
        this.inv.classList.remove("hide");
        // hide the status panel
        this.statusPanel.classList.add("hide");
        this.inventoryOpen = true;
        document.getElementById("invButton").innerText = "Status";
    }

    viewStatus() {
        // show the status panel
        this.statusPanel.classList.remove("hide");
        // hide the inventory panel
        this.inv.classList.add("hide");
        this.inventoryOpen = false;
        document.getElementById("invButton").innerText = "Inventory";
    }

    updateInventory() {
        var itemList = document.getElementById("itemList");
        var inventory = this.game.player.inventory

        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        
        for(var item in inventory) {
            var li = document.createElement('li');
            li.innerHTML = "<div>" + item + "</div><div>" +inventory[item] + "</div>";
            itemList.appendChild(li);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UI;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Console {
	constructor() {
		const body = document.querySelector('.bottom');
		this.consoleElement = document.createElement('ul');
		this.consoleElement.id = "console";
		this.consoleElement.classList.add("panel");
		body.appendChild(this.consoleElement);
	}

	sendMessage(message, type=null) {
		var messageWrapper = document.createElement("li");
		messageWrapper.innerText = message;
		messageWrapper.className = "message";
		if(type) {
			messageWrapper.className += " " + type;
		}
		this.consoleElement.appendChild(messageWrapper);
		// scroll to bottom of console
		this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Console;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Controls {
    constructor(game) {
        this.game = game;
        this.events = [];
        // event listeners
        // TODO: Debounce input
        document.addEventListener('keydown', (e) => {
        	//console.log(e);
            if (e.keyCode === 40) { // Arrow Down
                // move down
                e.preventDefault();
                this.moveDown(game.player);
            } else if (e.keyCode === 39) { // Arrow Right
                // move right
                e.preventDefault();
                this.moveRight(game.player);
            } else if (e.keyCode === 38) { // Arrow Up
                // move up
                e.preventDefault();
                //moveUp(player);
                this.moveUp(game.player);
            } else if (e.keyCode === 37) { // Arrow Left
                // move left
                e.preventDefault();
                this.moveLeft(game.player);
            } else if (e.keyCode === 32) { // spacebar
            	this.interact(game.player, game.map);
            }
        });

        
    }



    moveUp(player) {
        if (this.checkUp(player)) {
            player.pos_y -= GLOBALS.TILE_HEIGHT;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkUp(player) {
        if(player.pos_y > 0) { // stay within map bounds
            var upRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT) - 1;
            var upCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH);
            // return value from collision map
            return !this.game.map.collisions[upRow][upCol];
        }
    }

    moveDown(player) {
        if (this.checkDown(player)) {
            player.pos_y += GLOBALS.TILE_HEIGHT;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkDown(player) {
        if (player.pos_y < ((GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT) - GLOBALS.TILE_HEIGHT)) {
            var downRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT) + 1;
            var downCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH);
            return !this.game.map.collisions[downRow][downCol];
        }
    }

    moveRight(player) {
        if (this.checkRight(player)) {
            player.pos_x += GLOBALS.TILE_WIDTH;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkRight(player) {
        if (player.pos_x < ((GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH) - GLOBALS.TILE_WIDTH)) {
            var rightRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT);
            var rightCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH) + 1;
            return !this.game.map.collisions[rightRow][rightCol];
        }
    }


    moveLeft(player) {
        if (this.checkLeft(player)) {
            player.pos_x -= GLOBALS.TILE_WIDTH;
            player.update();
            this.checkForEvent(player, this.game.map);
        }
    }

    checkLeft(player) {
        if (player.pos_x > 0) {
            var leftRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT);
            var leftCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH) - 1;
            return !this.game.map.collisions[leftRow][leftCol];
        }
    }

    interact(player, map) {
    	if(this.events.length > 0) {
    		var event = this.events[0]['properties']['action'];
	    	var result = this.game.events.eventList[event](this.events[0], this.game);
	    	this.game.console.sendMessage(result);
    	}
    }

    checkForEvent(player, map) {
    	this.events = [];
    	for (let e of map.events) {
            // events are positioned at bottom left in Tiled....
    		if (e.x == player.pos_x && e.y == player.pos_y + GLOBALS.TILE_HEIGHT) {
    			this.events.push(e);
    		}
    	}
    }

    toggleInventoryStatusPanel() {
        var ui = this.game.ui;
        if(!ui.inventoryOpen) {
            ui.viewInventory();
        }
        else {
            ui.viewStatus();
        } 
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controls;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Events{
	constructor() {
		this.eventList = {
			event(args, game) {
				return "events!";
			},
			teleport(args, game) {
				// load new map and move player to new map
				game.map.loadMap(args.properties.map,
					{
						x: (args.properties.destination_x - 1) * GLOBALS.TILE_WIDTH,
						y: (args.properties.destination_y - 1) * GLOBALS.TILE_HEIGHT
					}
				);
				if(args.properties.eventMessage) {
					return args.properties.eventMessage;
				}
				else {
					return "Moving to a new map";
				}
			},
			door(args, game) {
				// if door is locked check if unlock condition is met, then unlock
				if (args.properties.locked) {
					if(args.properties.unlock) {
						var uCondition = JSON.parse(args.properties.unlock);
						if(uCondition.item) {
							if (game.player.inventory[uCondition.item] >= uCondition.qty) {
								// unlock door permanently
								args.properties.unlock = false;
								// remove from inventory
								game.player.inventory[uCondition.item] -= uCondition.qty;
								return this.teleport(args, game);
							}
							else {
								// You don't meet the unlock condition
								// TODO: Maybe check for custom message here?
								// TODO: These message strings might should be in a global bank, so they're easier to change
								return "Locked!";
							}
						}
						else {
							// unknown unlock condition. Probably author error
							return "This door cannot be opened.";
						}
					}
					else if (args.properties.unlock === false) {
						// Door has been unlocked
                        return this.teleport(args, game);
                    }
                    else {
						// no unlock condition found? Probably author error
						return "Locked!";
					}
				}
				else {
					// Door is not locked, never was. Carry on.
					return this.teleport(args, game);
				}
			},
			item(args, game) {
				var itemCount = 0;
				var props = args.properties;
				var inv = game.player.inventory;

				// item name defaults to key value if no name is provided
				var itemName = props.name ? props.name : props.item;
				if(typeof inv[props.item] === 'undefined') {
					inv[props.item] = 0;
				}

				if(inv[props.item] < GLOBALS.ITEM_LIMIT) {
					// add item to inventory
					// TODO: This would be more efficient if you just subtract the overage from the item amt and add it
					while(inv[props.item] < GLOBALS.ITEM_LIMIT && props.qty > 0) { // while inventory isn't full and there are items left to be picked up
						// We should probably have a class for inventory with some get/set methods
						inv[props.item]++;
						itemCount++;
						props.qty--;
					}

					if ( props.qty < 1 ) {
						// remove item from events in proximity 
						game.controls.events = [];

						// remove item from game map
						for(let e of document.getElementById("entities").children) {
							if (e.id === "item_" + args.id) {
								document.getElementById("entities").removeChild(e);
							}
						}

						for (let [index, value] of game.map.events.entries()) {
							if (value.id === args.id) {
								game.map.events.splice(index, 1);
							}
						}
						if(game.ui.inventoryOpen) {
							// If the inventory panel is visible, it needs to be updated
							game.ui.updateInventory();
						}
						return `Added (${itemCount}) of ${itemName}`;
					}
					else {
						// change quantity 
						if(game.ui.inventoryOpen) {
							// If the inventory panel is visible, it needs to be updated
							game.ui.updateInventory();
						}
						return `Added (${itemCount}) of ${itemName}`;
					}
				}
				else {
					return `Can't carry anymore of ${itemName}!`;
				}
			},
			message(args, game) {
				var props = args.properties;
				return props.message;
			}
		};
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Events;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tileset__ = __webpack_require__(0);



class GameMap {
	constructor(map, game, drawMap=false) {
        this.game = game;
        this.player = game.player;
        this.promise = this.getMap(map, drawMap);
		this.mapName = map;
		this.tileset = game.TileSets.Tilesets[0].Tileset;
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
				this.tileset.tilesetImage.onload = function() {
					this.render();
				}.bind(this);
			}
		});

		return mapPromise;
	}

	loadMap(mapId, args) {
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
				var tileCoords = this.tileset.getTileCoords(tiles[(i*GLOBALS.MAP_WIDTH) + j]);
				ctx.drawImage(
					this.tileset.tilesetImage, 
					tileCoords.x, 
					tileCoords.y, 
					GLOBALS.TILE_WIDTH,
					GLOBALS.TILE_HEIGHT,
					j * GLOBALS.TILE_WIDTH, 
					i * GLOBALS.TILE_HEIGHT, 
					GLOBALS.TILE_WIDTH,
					GLOBALS.TILE_HEIGHT);
				// ctx.fillStyle = TILESET[tiles[(i*GLOBALS.MAP_WIDTH) + j]];
                // ctx.fillRect(
                // 	j * GLOBALS.TILE_WIDTH,
				// 	i * GLOBALS.TILE_HEIGHT,
				// 	GLOBALS.TILE_WIDTH,
				// 	GLOBALS.TILE_HEIGHT);
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
            this.game.player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */](container, this.game, {x: args.x, y: args.y});
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
/* harmony export (immutable) */ __webpack_exports__["a"] = GameMap;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controls__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__console__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UI__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__NPC__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Tileset__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Tilesets__ = __webpack_require__(2);










const body = document.querySelector(".top");

// create map element
const mapElement = document.createElement("canvas");
mapElement.id = "map";
body.appendChild(mapElement);

window.GLOBALS = {
    TILE_WIDTH: 16,
    TILE_HEIGHT: 16,
    MAP_WIDTH: 20,
    MAP_HEIGHT: 20,
	ITEM_LIMIT: 99,
	img_path: "/images/"
}

// use this for static text content later?
const CONTENT = {

};

// var tileImages = ["0x72_16x16DungeonTileset.v4.png", "0x72_16x16DungeonTileset_walls.v1.png"];
var tileImages = [
	{
		src: "0x72_16x16DungeonTileset.v4.png", // going to need to get first gid values for each tileset
		height: 16,
		width: 16
	}
];

window.TILESET = [
	"#000",
	"#000",
	"#333",
	"#999",
	"#ffa464",
	"#00ff00",
	"#00ffff",
	"#fff",
	"#00ff99"
];

var gameObj;
class Game {
	constructor(map) {
		var tempTilesets = [];
		tileImages.forEach(element => {
			tempTilesets.push(new __WEBPACK_IMPORTED_MODULE_6__Tileset__["a" /* default */](element));
		});
		this.TileSets = new __WEBPACK_IMPORTED_MODULE_7__Tilesets__["a" /* default */](tempTilesets);
		console.log(this.TileSets);
		this.player = null;
        this.mapList = {};
        this.map = new __WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */](map, this, true);
		this.controls = new __WEBPACK_IMPORTED_MODULE_1__controls__["a" /* default */](this);
		//this.mapList[this.map.mapName] = this.map;
		this.events = new __WEBPACK_IMPORTED_MODULE_3__events__["a" /* default */]();
		this.ui = new __WEBPACK_IMPORTED_MODULE_4__UI__["a" /* default */](this);
		this.console = new __WEBPACK_IMPORTED_MODULE_2__console__["a" /* default */]();
		// starting inventory
		this.startingInventory = {potion: 1, mana: 1};
	}
}

function getNodeIndex (n) {
		var i = 0;
		while(n = n.previousElementSibling) {
			i++;
		}
		return i;
	}

document.addEventListener('DOMContentLoaded', (e) => {
	window.gameObj = new Game(1);
	window.gameObj.console.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
	constructor(canvas, game, pos={x:0,y:0}) {
		this.game = game;
		this.canvas = canvas;
		this.tilesDrawn = false;

		// player positioning
		this.pos_x = pos.x;
		this.pos_y = pos.y;

		// elem.style.top = this.pos_y + "px";
		// elem.style.left = this.pos_x + "px";

		// player attrs
		this.hp = 100;
		this.mp = 100;
		this.inventory = game.startingInventory;
		this.draw();
	};

	draw() {
		var ctx = this.canvas.getContext("2d");
		ctx.fillStyle = TILESET[6];
		ctx.fillRect(this.pos_x, this.pos_y, GLOBALS.TILE_WIDTH, GLOBALS.TILE_HEIGHT);
	}

	update() {
		// this.elem.style.top = this.pos_y + "px";
		// this.elem.style.left = this.pos_x + "px";
		this.game.map.render();
		this.draw();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;



/***/ })
/******/ ]);