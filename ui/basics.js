SLib.ui = {
	// creates a black div above all webcontent to direct the users attention
	fadeScreenToBlack : function(element2remove) {
		/* create div */
		var div = document.createElement("div");
		div.style.position = "fixed";
		div.style.top = "0px";
		div.style.bottom = "0px";
		div.style.left = "0px";
		div.style.right = "0px";
		div.style.backgroundColor = "#000";
		div.style.opacity = 0.75;
		div.style.zIndex = 98; /* >99 reserved for dialogs above this */
		div.id = "blackScreenBlocker";
		
		div.onclick = function(event) {
			SLib.ui.fadeScreenToNormal(element2remove);
		};
		/* if animation is loaded */
		if(SLib.showByOpacity) {
			div.style.display = "none";
			SLib.showByOpacity(div, 250, 0.75);
		}
		SLib.byTag("body")[0].appendChild(div);
	},
	// removes the black div that blocks the webpage
	fadeScreenToNormal : function(element2remove) {
		if(SLib.hideByOpacity) {
			/* fade away and remove */
			if(SLib.byId("blackScreenBlocker"))
				SLib.hideByOpacity(SLib.byId("blackScreenBlocker"), 500, function(div) {
					div.parentNode.removeChild(div);
				});
			if(element2remove)
				SLib.hideByOpacity(element2remove, 250, function(div) {
					div.parentNode.removeChild(div);
				});
		} else {
		/* or simply remove */
			if(SLib.byId("blackScreenBlocker"))
				SLib.byId("blackScreenBlocker").parentNode.removeChild(SLib.byId("blackScreenBlocker"));
			if(element2remove)
				element2remove.parentNode.removeChild(element2remove);
		}
	},
	getViewportSize : function () {
		var size = {height:null, width:null};
		if(window.innerHeight) {
			// Standard Browser
			size.height = window.innerHeight;
			size.width  = window.innerWidth;
		} else if(document.body.clientHeight) {
			// ie
			size.height = document.body.clientHeight;
			size.width  = document.body.clientWidth;
		} else if(document.documentElement.clientHeight) {
			// ie standardmode
			size.height = document.documentElement.clientHeight;
			size.width  = document.documentElement.clientWidth;
		}
		return size;
	},
	getScrollOffset : function () {
		var offset = {x:null, y:null};
		if(window.pageYOffset) {
			offset.x = window.pageXOffset;
			offset.y = window.pageYOffset;
		} else if(document.body.scrollTop) {
			offset.x = document.body.scrollLeft;
			offset.y = document.body.scrollTop;
		} else if(document.documentElement.scrollTop) {
			offset.x = document.documentElement.scrollLeft;
			offset.y = document.documentElement.scrollTop;
		}
		return offset;
	}
};
