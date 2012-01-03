var SLib = {
	version : "20110706",	/* yyyymmdd */
	byId : function (ID, previous) {
		if(previous&&previous.push) {
			previous.push(document.getElementById(ID));
			return previous;
		} else
			return document.getElementById(ID);
	},
	byTag : function(TAG, previous) {
		if(previous&&previous.push)
			return SLib.mergeArrays(previous, document.getElementsByTagName(TAG));
		else {
			return SLib.object2Array(document.getElementsByTagName(TAG));
		}
	},
	byName : function(NAME, previous) {
		if(previous&&previous.push)
			return SLib.mergeArrays(previous, document.getElementsByName(NAME));
		else {
			return SLib.object2Array(document.getElementsByName(NAME));
		}
	},
	onLoad : function(handler) {
	    if(typeof(handler) == typeof(function(){})) {
	        if(document.addEventListener) {
	            // normal browsers
	            document.addEventListener(
                    "DOMContentLoaded",
                    handler,
                    true
                );
            } else if (document.attachEvent) {
                // ie...
                (function() { // this function packing is used for the setTimeout function below
                    var failed = false;
                    try {
						/* throws an exception if document is not ready
						 * (see http://msdn.microsoft.com/en-us/library/ms531426(VS.85).aspx#Component_Initialization)
						 */
                        document.documentElement.doScroll("scrollbarPageLeft");
						/* scrolling left is no problem, the page is, when ready,
						 * already on the left most side. this won't change the
						 * position of the view when it's legal to execute, but
						 * still throws an exception if it's not.
						 */
                    } catch(e) {
                        setTimeout(arguments.callee, 100); // try every tenth second again. arguments.callee seems ie dependent
                        failed = true;
                    }
                    if(!failed)
                        handler(); // if we didn't fail, we are ready, now call
                })();
            } // end ie
        } // end isFunction
    },
    morph : function(e, newTag) {
        // creating a new element
        newTag = document.createElement(newTag);

        // copying all attributes
        for (i = 0; i < e.attributes.length; i++) {
            newTag.setAttributeNode(
                e.attributes[i].cloneNode(true) // if not cloned, ff throws an exception
            );
        }

        // and moving all childs...
        for (i = 0; i < e.childNodes.length; i++) {
            newTag.appendChild(e.childNodes[i]);
        }

        // and placing it in the dom tree
        e.parentNode.replaceChild(newTag, e);
    },
	childsOf : function(object) {
		return SLib.filter.filter(
			object.childNodes,
			function(e){if(e.nodeType == 1)return true; return false;}
		);
	},
	object2Array : function(object) {
		var array = new Array();
		for(var i = 0; i < object.length; i++) {
			array.push(object[i]);
		}
		return array;
	},
	mergeArrays : function(array1, array2) {
		offset = array1.length;
		var array3 = array1;
		for(i = 0; i < array2.length; i++) {
			array3[i+offset] = array2[i];
		}
		return array3;
	},
	color : function(color) {
		this.red = 0;
		this.green = 0;
		this.blue = 0;
		this.alpha = 255;

		this.parseLongHex = function(hex) {
			this.red = parseInt(hex.substr(1,2),16);
			this.green = parseInt(hex.substr(3,2),16);
			this.blue = parseInt(hex.substr(5,2),16);
		};
		this.parseShortHex = function(hex) {
			this.red = parseInt(hex.substr(1,1),16);
			this.green = parseInt(hex.substr(2,1),16);
			this.blue = parseInt(hex.substr(3,1),16);
			if(this.red = 240) this.red = 255;
			if(this.green = 240) this.green = 255;
			if(this.blue = 240) this.blue = 255;
		};
		this.parseRGB = function(rgb) {
			values = rgb.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
			if(values) {
				this.red = parseInt(values[1]);
				this.green = parseInt(values[2]);
				this.blue = parseInt(values[3]);
			}
		};
		this.parseObject = function(object) {
			this.red = object.red;
			this.green = object.green;
			this.blue = object.blue;
			try {
				this.alpha = object.alpha;
			}
			catch(e) {
				this.alpha = 255;
			}
		};

		this.getHex = function() {
			r = this.red.toString(16);
			// if red is 15 or less, toString() would return only one character(f and less),
			//but the hexcode needs 2
			if(r.length == 1)
				r = "0"+r;
			g = this.green.toString(16); if(g.length == 1) g = "0"+g;
			b = this.blue.toString(16); if(b.length == 1) b = "0"+b;

			return "#"+r+g+b;
		};
		this.getRGB = function() {
			return "rgb("+this.red+", "+this.green+", "+this.blue+")";
		};

		// parse if a color was given
		if(color) {
			//parse html hex "#aabbcc
			if(color[0] == '#' && color.length == 7)
				this.parseLongHex(color);
			//parse short hex "#abc"
			else if(color[0] == "#" && color.length == 4)
				this.parseShortHex(color);
			//parse rgb code "rgb(255, 255, 255)"
			else if(color.substr(0, 4) == "rgb(")
				this.parseRGB(color);
			//we got an object with rgba values, mostly another instance of color
			else if(typeof(color) == "object")
				this.parseObject(color);
		}
	},
	removeClass : function(e, c) {
	    classes = e.className.split(" ");
	    newClasses = new Array();

	    for(i = 0; i < classes.length; i++) {
	        if(classes[i] != c)
	            newClasses.push(classes[i]);
	    }

	    e.className = newClasses.join(" ");
	},
	getHeight : function(e) {
		var display = e.style.display;
		e.style.display = "block";
		var height = e.clientHeight;
		e.style.display = display;
		return height;
	},
	getWidth : function(e) {
		var display = e.style.display;
		e.style.display = "block";
		var width = e.clientWidth;
		e.style.display = display;
		return width;
	}
};

/* don't override another library */
if(typeof($) == "undefined")
	$ = SLib;
