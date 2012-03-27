SLib.calc = {
	accelerate : function(percentage) {
		return percentage*percentage*percentage; /* x^3 */
	},
	declerate : function(percentage) {
		return -1*(percentage*percentage*percentage)+1; /* -(x^3)+1 */
	},
	straight: function(percentage) {
		return percentage;
	}
}
