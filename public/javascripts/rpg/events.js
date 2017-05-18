export default class Events{
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
					while(inv[props.item] < GLOBALS.ITEM_LIMIT && props.qty > 0) { // while inventory isn't full and there are items left to be picked up
						inv[props.item] ++;
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
						return `Added (${itemCount}) of ${itemName}`;
					}
					else {
						// change quantity 
						return `Added (${itemCount}) of ${itemName}`;
					}
				}
				else {
					return `Can't carry anymore of ${itemName}!`;
				}
			}
		};
	}
}