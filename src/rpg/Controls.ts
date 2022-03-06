import ConfigMgr from '../core/ConfigMgr'
import Rectangle from '../core/primitives/Rectangle'
import Events from '../core/events/Events'
import EventLib from '../core/events/EventLibrary'
import KeyboardInput from '../core/input/Keyboard'
import MouseInput from '../core/input/Mouse'
import GameMap from '../core/GameMap/GameMap'
import ObjectLayer from '../core/GameMap/Layers/ObjectLayer'
import CollisionLayer from '../core/GameMap/Layers/CollisionLayer'
import Game from './Game'


type ControlFunctionCallback = (e:Event) => EventListener;

class EventListener {

}
export default class Controls {
    events: Events[];
    entity: any
    map: GameMap
    controls: {}
    eventListeners: {}
    
    constructor(entity:any) {
        this.entity = entity;
        this.controls = {};
        this.eventListeners = {};

        document.addEventListener('keyup', (e) => {
            entity.setCurrentAnimation('default');
        })
    }

    on(key:KeyboardEvent["key"], action: { (e: any): void; (this: Document, ev: KeyboardEvent): any }) {
        console.log(key);
        this.controls[key] = action;
        let listener = document.addEventListener('keydown', (e) => {
            if (e.key === key) {
                action(e);
            }
        });
        this.eventListeners[key] = listener;
        return listener;
    }

    // interact(map) {
    // 	if(map.events.length > 0) {
    // 		var action = map.events[0]['properties'].find(prop => prop.name === "action");
    //         var properties = {};
    //         map.events[0].properties.forEach(prop => {
    //             properties[prop.name] = prop.value;
    //         });
    //         var result = EventLib.eventList[action.value](properties, this.map);
	//     	// this.map.console.sendMessage(result);
    // 	}
    // }

    // checkForEvent(player, map) {
    // 	for (let e of map.events) {
    //         // events are positioned at bottom left in Tiled....
    // 		if (e.x == player.getBounds().getX() && e.y == player.getBounds().getY() + ConfigMgr.getGlobal('TILE_HEIGHT')) {
    // 			this.events.push(e);
    // 		}
    // 	}
    // }

    toggleInventoryStatusPanel() {
        // var ui = this.game.ui;
        // if(!ui.isInventoryOpen) {
        //     ui.viewInventory();
        // }
        // else {
        //     ui.viewStatus();
        // } 
    }
}