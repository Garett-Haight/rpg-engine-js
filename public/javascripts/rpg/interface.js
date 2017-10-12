export default class Interface{
	constructor(game) {
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
        this.inv.className = "hide panel";
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
        		}.bind(this)
        	);
        }
    }


}