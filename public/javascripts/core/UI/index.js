import { Globals } from '../ConfigMgr'
import DOM from '../dom/index'
export default class UI {
	constructor(game) {
		this.game = game;
        this.container = document.querySelector('#menu');
        // if (this.container === null) {
        //     this.container = document.createElement('div');
        //     this.container.id = "menu";
        //     document.querySelector(".top").appendChild(this.container);
        // }

        // this.inventoryOpen = false;
       	
        // // status panels and controls are the default menu state
        // this.statusPanel = document.createElement("div");
        // this.statusPanel.id = "statusPanel";
        // this.statusPanel.classList.add("panel");
        // this.container.appendChild(this.statusPanel);

        // // Inventory panel
        // this.inv = document.createElement("div");
        // this.inv.id = "inventoryPanel";
        // this.inv.classList.add("panel");
        // var itemList = document.createElement("ul");
        // itemList.id = "itemList";
        // this.inv.appendChild(itemList);
        // this.inv.className = "hide panel";
        // this.container.appendChild(this.inv);


       	// var statusTable = document.createElement("table");
       	// var tr = document.createElement("tr");
       	// var td = document.createElement("td");
       	// td.innerText = "HP: ";
       	// statusTable.appendChild(tr);
       	// tr.appendChild(td);

       	// var td2 = document.createElement("td");
       	// td2.innerText = "100/100";
       	// tr.appendChild(td2);

       	// statusPanel.appendChild(statusTable);

        // this.controlsElement = document.createElement("div");
        // this.controlsElement.id = "controls";
        // this.controlsElement.classList.add("panel");
        // this.container.appendChild(this.controlsElement);

        // var arrowDiv = document.createElement("div");
        // var actionDiv = document.createElement("div");
        // this.controlsElement.appendChild(arrowDiv);
        // this.controlsElement.appendChild(actionDiv);

        // this.createButton("Check", "checkButton", actionDiv, "interact");
        // this.createButton("Inventory", "invButton", actionDiv, "toggleInventoryStatusPanel");

        // this.createButton("▲", "upArrowButton", arrowDiv, "moveUp");
        // this.createButton("◀", "leftArrowButton", arrowDiv, "moveLeft");
        // this.createButton("▶", "rightArrowButton", arrowDiv, "moveRight");
        // this.createButton("▼", "downArrowButton", arrowDiv, "moveDown");

	}

    static createCanvas(id, parent, width, height) {
        let canvas = DOM.CanvasStore.create(
            id,
            parent,
            width * Globals.TILE_WIDTH,
            height * Globals.TILE_HEIGHT,
        );
        return canvas;
    }

    static createPanel(id, parent) {
        let panel = document.createElement('div');
        panel.id = id;
        parent.appendChild(panel);
        return panel;
    }
    
	static createButton(text, id, appendTo=this.container, func) {
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

    static viewInventory() {
        // update the inventory list
        this.updateInventory();

        // show the inventory panel
        this.inv.classList.remove("hide");
        // hide the status panel
        this.statusPanel.classList.add("hide");
        this.inventoryOpen = true;
        document.getElementById("invButton").innerText = "Status";
    }

    static viewStatus() {
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