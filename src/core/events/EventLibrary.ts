import ConfigMgr from '../ConfigMgr'
import MapStore from '../MapStore'

class EventLibrary {
	public eventList: any;

     constructor() {
		this.eventList = {
			event(properties, game) {
				return "events!";
			},
			teleport(properties, game) { // TODO: update this to work with in-map teleportation
				// load new map and move player to new map
				MapStore.get(properties.map).then((res) => {
					game.map.changeMap(properties.map,
						{
							x: (properties.destination_x - 1) * ConfigMgr.getGlobal('TILE_WIDTH'),
							y: (properties.destination_y - 1) * ConfigMgr.getGlobal('TILE_HEIGHT')
						}
					);
				});
				
				if(properties.eventMessage) {
					return properties.eventMessage;
				}
				else {
					return "Moving to a new map";
				}
			},
			door(properties, game) {
				// if door is locked check if unlock condition is met, then unlock
				console.log(properties);
				if (properties.locked) {
					if (properties.unlock) {
						var uCondition = JSON.parse(properties.unlock);
						if (uCondition.item) {
							if (game.player.inventory[uCondition.item] >= uCondition.qty) {
								// unlock door permanently
								properties.unlock = false;
								// remove from inventory
								game.player.inventory[uCondition.item] -= uCondition.qty;
								return this.teleport(properties, game);
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
					else if (properties.unlock === false) {
						// Door has been unlocked
                        return this.teleport(properties, game);
                    }
                    else {
						// no unlock condition found? Probably author error
						return "Locked!";
					}
				}
				else {
					// Door is not locked, never was. Carry on.
					return this.teleport(properties, game);
				}
			},
			item(properties, game) {
				var itemCount = 0;
				var props = properties;
				var inv = game.player.inventory;

				// item name defaults to key value if no name is provided
				var itemName = props.name ? props.name : props.item;
				if(typeof inv[props.item] === 'undefined') {
					inv[props.item] = 0;
				}

				if(inv[props.item] < ConfigMgr.getGlobal('ITEM_LIMIT')) {
					// add item to inventory
					// TODO: This would be more efficient if you just subtract the overage from the item amt and add it
					while(inv[props.item] < ConfigMgr.getGlobal('ITEM_LIMIT') && props.qty > 0) { // while inventory isn't full and there are items left to be picked up
						// We should probably have a class for inventory with some get/set methods
						inv[props.item]++;
						itemCount++;
						props.qty--;
					}

					if ( props.qty < 1 ) {
						// remove item from events in proximity 
						game.controls.events = [];

						// remove item from game map
						// for(let e of document.getElementById("entities").children) {
						// 	if (e.id === "item_" + properties.id) {
						// 		document.getElementById("entities").removeChild(e);
						// 	}
						// }

						for (let [index, value] of game.map.events.entries()) {
							if (value.id === properties.id) {
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
			message(properties, game) {
				var props = properties;
				return props.message;
			}
		};
     }
}

const instance = new EventLibrary();
Object.freeze(instance);
export default instance;