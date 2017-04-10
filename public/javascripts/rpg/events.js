class Events{
	constructor() {
		this.eventList = {
			event(args, game) {
				return "events!";
			},
			teleport(args, game) {
				console.log(args);
				console.log(game);
				// load new map

				// move player to new map

				return "teleport!";
			},
			item(args, game) {
				var itemCount = 0;;
				var props = args.properties;
				var inv = game.player.inventory;
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


						// remove item from game map
						for (let [index, value] of game.map.events.entries()) {
							if (value.id === args.id) {
								game.map.events.splice(index, 1);
							}
						}
						return `Added (${itemCount}) of ${props.item}`;
					}
					else {
						// change quantity 
						return `Added (${itemCount}) of ${props.item}`;
					}
					
				}
				else {
					return `Can't carry anymore of ${props.item}!`;
				}
			}
		};
	}
}