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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Console = function () {
	function Console() {
		_classCallCheck(this, Console);

		var body = document.querySelector('.bottom');
		this.consoleElement = document.createElement('ul');
		this.consoleElement.id = "console";
		this.consoleElement.classList.add("panel");
		body.appendChild(this.consoleElement);
	}

	_createClass(Console, [{
		key: 'sendMessage',
		value: function sendMessage(message) {
			var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			var messageWrapper = document.createElement("li");
			messageWrapper.innerText = message;
			messageWrapper.className = "message";
			if (type) {
				messageWrapper.className += " " + type;
			}
			this.consoleElement.appendChild(messageWrapper);
			// scroll to bottom of console
			this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
		}
	}]);

	return Console;
}();

exports.default = Console;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controls = function () {
    function Controls(game) {
        var _this = this;

        _classCallCheck(this, Controls);

        this.game = game;
        this.events = [];
        // event listeners
        document.addEventListener('keydown', function (e) {
            //console.log(e);
            if (e.keyCode === 40) {
                // Arrow Down
                // move down
                e.preventDefault();
                _this.moveDown(game.player);
            } else if (e.keyCode === 39) {
                // Arrow Right
                // move right
                e.preventDefault();
                _this.moveRight(game.player);
            } else if (e.keyCode === 38) {
                // Arrow Up
                // move up
                e.preventDefault();
                //moveUp(player);
                _this.moveUp(game.player);
            } else if (e.keyCode === 37) {
                // Arrow Left
                // move left
                e.preventDefault();
                _this.moveLeft(game.player);
            } else if (e.keyCode === 32) {
                // spacebar
                _this.interact(game.player, game.map);
            }
        });
    }

    _createClass(Controls, [{
        key: 'moveUp',
        value: function moveUp(player) {
            if (this.checkUp(player)) {
                player.pos_y -= GLOBALS.TILE_HEIGHT;
                player.update();
                this.checkForEvent(player, this.game.map);
            }
        }
    }, {
        key: 'checkUp',
        value: function checkUp(player) {
            if (player.pos_y > 0) {
                // stay within map bounds
                var upRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT) - 1;
                var upCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH);
                // return value from collision map
                return !this.game.map.collisions[upRow][upCol];
            }
        }
    }, {
        key: 'moveDown',
        value: function moveDown(player) {
            if (this.checkDown(player)) {
                player.pos_y += GLOBALS.TILE_HEIGHT;
                player.update();
                this.checkForEvent(player, this.game.map);
            }
        }
    }, {
        key: 'checkDown',
        value: function checkDown(player) {
            if (player.pos_y < GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT - GLOBALS.TILE_HEIGHT) {
                var downRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT) + 1;
                var downCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH);
                return !this.game.map.collisions[downRow][downCol];
            }
        }
    }, {
        key: 'moveRight',
        value: function moveRight(player) {
            if (this.checkRight(player)) {
                player.pos_x += GLOBALS.TILE_WIDTH;
                player.update();
                this.checkForEvent(player, this.game.map);
            }
        }
    }, {
        key: 'checkRight',
        value: function checkRight(player) {
            if (player.pos_x < GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH - GLOBALS.TILE_WIDTH) {
                var rightRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT);
                var rightCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH) + 1;
                return !this.game.map.collisions[rightRow][rightCol];
            }
        }
    }, {
        key: 'moveLeft',
        value: function moveLeft(player) {
            if (this.checkLeft(player)) {
                player.pos_x -= GLOBALS.TILE_WIDTH;
                player.update();
                this.checkForEvent(player, this.game.map);
            }
        }
    }, {
        key: 'checkLeft',
        value: function checkLeft(player) {
            if (player.pos_x > 0) {
                var leftRow = Math.floor(player.pos_y / GLOBALS.TILE_HEIGHT);
                var leftCol = Math.floor(player.pos_x / GLOBALS.TILE_WIDTH) - 1;
                return !this.game.map.collisions[leftRow][leftCol];
            }
        }
    }, {
        key: 'interact',
        value: function interact(player, map) {
            if (this.events.length > 0) {
                var event = this.events[0]['properties']['action'];
                var result = this.game.events.eventList[event](this.events[0], this.game);
                this.game.console.sendMessage(result);
            }
        }
    }, {
        key: 'checkForEvent',
        value: function checkForEvent(player, map) {
            this.events = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = map.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var e = _step.value;

                    // events are positioned at bottom left in Tiled....
                    if (e.x == player.pos_x && e.y == player.pos_y + GLOBALS.TILE_HEIGHT) {
                        this.events.push(e);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'viewInventory',
        value: function viewInventory() {
            this.inv.className = "";
            this.statusPanel.className = "hide";
        }
    }]);

    return Controls;
}();

exports.default = Controls;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function Events() {
	_classCallCheck(this, Events);

	this.eventList = {
		event: function event(args, game) {
			return "events!";
		},
		teleport: function teleport(args, game) {
			// load new map and move player to new map
			game.map.loadMap(args.properties.map, {
				x: (args.properties.destination_x - 1) * GLOBALS.TILE_WIDTH,
				y: (args.properties.destination_y - 1) * GLOBALS.TILE_HEIGHT
			});
			if (args.properties.eventMessage) {
				return args.properties.eventMessage;
			} else {
				return "Moving to a new map";
			}
		},
		door: function door(args, game) {
			// if door is locked check if unlock condition is met, then unlock
			if (args.properties.locked) {
				if (args.properties.unlock) {
					var uCondition = JSON.parse(args.properties.unlock);
					if (uCondition.item) {
						if (game.player.inventory[uCondition.item] >= uCondition.qty) {
							// unlock door permanently
							args.properties.unlock = false;
							// remove from inventory
							game.player.inventory[uCondition.item] -= uCondition.qty;
							return this.teleport(args, game);
						} else {
							// You don't meet the unlock condition
							// TODO: Maybe check for custom message here?
							// TODO: These message strings might should be in a global bank, so they're easier to change
							return "Locked!";
						}
					} else {
						// unknown unlock condition. Probably author error
						return "This door cannot be opened.";
					}
				} else if (args.properties.unlock === false) {
					// Door has been unlocked
					return this.teleport(args, game);
				} else {
					// no unlock condition found? Probably author error
					return "Locked!";
				}
			} else {
				// Door is not locked, never was. Carry on.
				return this.teleport(args, game);
			}
		},
		item: function item(args, game) {
			var itemCount = 0;
			var props = args.properties;
			var inv = game.player.inventory;

			// item name defaults to key value if no name is provided
			var itemName = props.name ? props.name : props.item;
			if (typeof inv[props.item] === 'undefined') {
				inv[props.item] = 0;
			}

			if (inv[props.item] < GLOBALS.ITEM_LIMIT) {
				// add item to inventory
				while (inv[props.item] < GLOBALS.ITEM_LIMIT && props.qty > 0) {
					// while inventory isn't full and there are items left to be picked up
					inv[props.item]++;
					itemCount++;
					props.qty--;
				}

				if (props.qty < 1) {
					// remove item from events in proximity 
					game.controls.events = [];

					// remove item from game map
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = document.getElementById("entities").children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var e = _step.value;

							if (e.id === "item_" + args.id) {
								document.getElementById("entities").removeChild(e);
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = game.map.events.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var _step2$value = _slicedToArray(_step2.value, 2),
							    index = _step2$value[0],
							    value = _step2$value[1];

							if (value.id === args.id) {
								game.map.events.splice(index, 1);
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					return "Added (" + itemCount + ") of " + itemName;
				} else {
					// change quantity 
					return "Added (" + itemCount + ") of " + itemName;
				}
			} else {
				return "Can't carry anymore of " + itemName + "!";
			}
		},
		message: function message(args, game) {
			var props = args.properties;
			return props.message;
		}
	};
};

exports.default = Events;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interface = function () {
        function Interface(game) {
                _classCallCheck(this, Interface);

                this.game = game;
                this.container = document.querySelector('#menu');
                if (this.container === null) {
                        this.container = document.createElement('div');
                        this.container.id = "menu";
                        document.querySelector(".top").appendChild(this.container);
                }

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
                this.inv.className = "hide";
                this.container.appendChild(this.inv);

                // Health meter... or just a table for now
                // var healthMeter = document.createElement("div");
                // healthMeter.id = "healthMeter";
                // this.statusPanel.appendChild(healthMeter);
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
                this.createButton("Inventory", "invButton", actionDiv, "viewInventory");

                this.createButton("▲", "upArrowButton", arrowDiv, "moveUp");
                this.createButton("◀", "leftArrowButton", arrowDiv, "moveLeft");
                this.createButton("▶", "rightArrowButton", arrowDiv, "moveRight");
                this.createButton("▼", "downArrowButton", arrowDiv, "moveDown");
        }

        _createClass(Interface, [{
                key: 'createButton',
                value: function createButton(text, id) {
                        var appendTo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.container;
                        var func = arguments[3];

                        var button = document.createElement("button");
                        button.innerText = text;
                        button.id = id;
                        appendTo.appendChild(button);
                        if (typeof this.game.controls[func] !== 'undefined') {
                                button.addEventListener('click', function (e) {
                                        this.game.controls[func](this.game.player);
                                }.bind(this));
                        }
                }
        }]);

        return Interface;
}();

exports.default = Interface;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(6);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameMap = function () {
	function GameMap(map, game) {
		var drawMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		_classCallCheck(this, GameMap);

		this.game = game;
		this.player = game.player;
		this.promise = this.getMap(map, drawMap);
		this.mapName = map;
	}

	_createClass(GameMap, [{
		key: 'getMap',
		value: function getMap(mapId, drawMap) {
			var _this = this;

			// Clear current maps
			this.map = null;
			this.collisions = null;
			this.events = null;

			// check if map has already been loaded to mapList
			var mapPromise = new Promise(function (resolve, reject) {
				if (!_this.game.mapList[mapId]) {
					var request = new XMLHttpRequest();
					request.open('Get', '/maps/map' + mapId + '.json');
					request.onreadystatechange = function () {
						if (request.readyState === 4) {
							if (request.status === 200) {
								resolve(JSON.parse(request.responseText));
							} else {
								reject("Something went wrong.");
							}
						}
					};
					request.send();
				} else {
					resolve(_this.game.mapList[mapId]);
				}
			});

			mapPromise.then(function (response) {
				_this.mapName = mapId;
				if (!_this.game.mapList[mapId]) {
					// non-cached response returns JSON which needs to be parsed
					_this.map = response;
					_this.parseEvents();
				} else {
					// cached response returns an object,
					// we can skip the parsing functions and assign values from stored arrays/objects
					_this.map = response.map;
					_this.collisions = response.collisions;
					_this.events = response.events;
				}

				if (drawMap) {
					_this.render();
				}
			});

			return mapPromise;
		}
	}, {
		key: 'loadMap',
		value: function loadMap(mapId, args) {
			var _this2 = this;

			// update mapList with current version of the map
			this.game.mapList[this.mapName] = Object.assign(Object.create(this), this);

			var mapPromise = this.getMap(mapId, true);

			mapPromise.then(function () {
				var entitiesContainer = document.querySelector('#entities');
				_this2.placePlayer(entitiesContainer, args);
			});
		}
	}, {
		key: 'drawMap',
		value: function drawMap() {
			var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#map";

			var map = this.map;
			var tiles = map.layers[0].data;
			var mapElement = document.querySelector(container);
			var ctx = mapElement.getContext("2d");
			// Clear previous render
			ctx.clearRect(0, 0, GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH, GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT);

			mapElement.width = GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH;
			mapElement.height = GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT;
			map.width = GLOBALS.MAP_WIDTH;
			map.height = GLOBALS.MAP_HEIGHT;

			for (var i = 0; i < map.height; i++) {
				for (var j = 0; j < map.width; j++) {
					ctx.fillStyle = TILESET[tiles[i * GLOBALS.MAP_WIDTH + j]];
					ctx.fillRect(j * GLOBALS.TILE_WIDTH, i * GLOBALS.TILE_HEIGHT, GLOBALS.TILE_WIDTH, GLOBALS.TILE_HEIGHT);
				}
				this.tilesDrawn = true;
			}
		}
	}, {
		key: 'parseCollisions',
		value: function parseCollisions() {
			var collisions = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.map.layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var layer = _step.value;

					if (layer.name == "Collisions") {
						for (var i = 0; i < GLOBALS.MAP_HEIGHT; i++) {
							var cells = [];
							for (var j = 0; j < GLOBALS.MAP_WIDTH; j++) {
								cells.push(layer.data[i * GLOBALS.MAP_WIDTH + j]);
							}
							collisions.push(cells);
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.collisions = collisions;
		}

		// Events are items, map teleports, etc.

	}, {
		key: 'parseEvents',
		value: function parseEvents() {
			var events;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.map.layers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var layer = _step2.value;

					if (layer.name == "Events") {
						events = layer.objects;
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.events = events;
		}
	}, {
		key: 'drawEvents',
		value: function drawEvents() {
			var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".top";

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
			ctx.clearRect(0, 0, GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH, GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT);
			ctx.fillStyle = TILESET[5];

			if (this.events.length > 0) {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this.events[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var e = _step3.value;

						if (e.visible) {
							ctx.fillRect(e.x, e.y - GLOBALS.TILE_HEIGHT, GLOBALS.TILE_WIDTH, GLOBALS.TILE_HEIGHT);
						}
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		}

		// Entities are players, mobs, and NPCs

	}, {
		key: 'drawEntities',
		value: function drawEntities() {
			var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".top";

			var map = this.map;
			var mapElement = document.querySelector(container);
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = map.layers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var layer = _step4.value;

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
							ctx.clearRect(0, 0, GLOBALS.MAP_WIDTH * GLOBALS.TILE_WIDTH, GLOBALS.MAP_HEIGHT * GLOBALS.TILE_HEIGHT);

							var _iteratorNormalCompletion5 = true;
							var _didIteratorError5 = false;
							var _iteratorError5 = undefined;

							try {
								for (var _iterator5 = layer.objects[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
									var e = _step5.value;

									// Tiled positions objects at bottom left instead of top left
									e.y = e.y - GLOBALS.TILE_HEIGHT;
									if (e.name == "Player" && !this.game.player) {
										this.placePlayer(entitiesContainer, { x: e.x, y: e.y });
									}
								}
							} catch (err) {
								_didIteratorError5 = true;
								_iteratorError5 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion5 && _iterator5.return) {
										_iterator5.return();
									}
								} finally {
									if (_didIteratorError5) {
										throw _iteratorError5;
									}
								}
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		}
	}, {
		key: 'placePlayer',
		value: function placePlayer(container, args) {
			if (!this.game.player) {
				this.game.player = new _player2.default(container, this.game, { x: args.x, y: args.y });
			} else {
				this.game.player.canvas = container;
				this.game.player.pos_x = args.x;
				this.game.player.pos_y = args.y;
				this.game.player.update();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			this.drawMap();
			if (!this.collisions) {
				this.parseCollisions();
			}

			// no need to parse events twice
			if (!this.events) {
				this.parseEvents();
			}
			this.drawEvents();
			this.drawEntities();
		}
	}]);

	return GameMap;
}();

exports.default = GameMap;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(4);

var _map2 = _interopRequireDefault(_map);

var _controls = __webpack_require__(1);

var _controls2 = _interopRequireDefault(_controls);

var _console = __webpack_require__(0);

var _console2 = _interopRequireDefault(_console);

var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

var _interface = __webpack_require__(3);

var _interface2 = _interopRequireDefault(_interface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var body = document.querySelector(".top");

// create map element
var mapElement = document.createElement("canvas");
mapElement.id = "map";
body.appendChild(mapElement);

window.GLOBALS = {
	TILE_WIDTH: 32,
	TILE_HEIGHT: 32,
	MAP_WIDTH: 10,
	MAP_HEIGHT: 10,
	ITEM_LIMIT: 99

	// use this for static text content later?
};var CONTENT = {};

window.TILESET = ["#000", "#000", "#333", "#999", "#ffa464", "#00ff00", "#00ffff", "#fff", "#00ff99"];

var gameObj;

var Game = function Game(map) {
	_classCallCheck(this, Game);

	this.player = null;
	this.mapList = {};
	this.map = new _map2.default(map, this, true);
	this.controls = new _controls2.default(this);
	//this.mapList[this.map.mapName] = this.map;
	this.events = new _events2.default();
	this.interface = new _interface2.default(this);
	this.console = new _console2.default();
};

function getNodeIndex(n) {
	var i = 0;
	while (n = n.previousElementSibling) {
		i++;
	}
	return i;
}

document.addEventListener('DOMContentLoaded', function (e) {
	window.gameObj = new Game(1);
	window.gameObj.console.sendMessage("Ye find yeself in yon dungeon. Obvious exits are NORTH, SOUTH, and DENNIS");
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
	function Player(canvas, game) {
		var pos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { x: 0, y: 0 };

		_classCallCheck(this, Player);

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
		this.inventory = {};
		this.draw();
	}

	_createClass(Player, [{
		key: "draw",
		value: function draw() {
			var ctx = this.canvas.getContext("2d");
			ctx.fillStyle = TILESET[6];
			ctx.fillRect(this.pos_x, this.pos_y, GLOBALS.TILE_WIDTH, GLOBALS.TILE_HEIGHT);
		}
	}, {
		key: "update",
		value: function update() {
			// this.elem.style.top = this.pos_y + "px";
			// this.elem.style.left = this.pos_x + "px";
			this.game.map.render();
			this.draw();
		}
	}]);

	return Player;
}();

exports.default = Player;

/***/ })
/******/ ]);