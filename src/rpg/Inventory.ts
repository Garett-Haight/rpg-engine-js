/** 
 * To be used for player inventory
 * @module Inventory
 */
import Item from './Item'
/** Class to be used for player inventory */
class Inventory
{
    inventory: Object;
    /**
     * Items
     * @param {Object} startingInventory 
     */
    constructor(startingInventory) {
        this.inventory = startingInventory;
    }

    /**
     * 
     * @param {Item} item 
     * @param {number} qty 
     */
    addItem(item, qty) {
        
    }
}

export default Inventory;