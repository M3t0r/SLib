SLib.filter = {
	filter : function(haystack, check) {
		if(haystack&&check) {
			if(haystack.length && typeof(check) == "function") {
				var array = new Array();
				for(i = 0; i < haystack.length; i++) {
					if(check(haystack[i])) {
						array.push(haystack[i]);
					}
				}
			}
			return array;
		}
	},
	byAttribute : function(haystack, attr, value) {
		return SLib.filter.filter(haystack, function(element) {
			if(element[attr] == value)
				return true;
			return false;
		});
	},
	byName : function(haystack, NAME) {
		return SLib.filter.filter(haystack, function(element) {
			if(element.name == NAME)
				return true;
			return false;
		});
	},
	byTag : function(haystack, TAG) {
		return SLib.filter.filter(haystack, function(element) {
			if(element.tagName == TAG)
				return true;
			return false;
		});
	},
	byClass : function(haystack, CLASS) {
		return SLib.filter.filter(haystack, function(element) {
			if(element.className.indexOf(CLASS) != -1)
				return true;
			return false;
		});
	},
};
