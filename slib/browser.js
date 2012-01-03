/* browsers implemented:
	IE + version
	FF + version
	Chrome + version
	Safari (version may never come, very cryptic useragent)
	Opera (version till 9.80, >10 still have the same useragent)
*/
SLib.browser = {};
if(navigator.userAgent.indexOf("MSIE") >-1) {
	/* internet Explorer */
	var version = navigator.userAgent.match(/MSIE (\d+)\.(\d+)/);
	SLib.browser.ie = {major  : version[1],
					   minor  : version[2],
					   string : version[0]};
	SLib.browser.trident = true;

} else if(navigator.userAgent.indexOf("Firefox") >-1) {
	/* firefox */
	var version = navigator.userAgent.match(/Firefox\/(\d+)\.(\d+)\.*(\d*)/);
	SLib.browser.ff = {major  : version[1],
					   minor  : version[2],
					   bug 	  : version[3] ? version[3] : 0,
					   string : version[0]};
    SLib.browser.gecko = true;

} else if(navigator.userAgent.indexOf("Chrome") >-1) {
    /* Chrome */
    var version = navigator.userAgent.match(/Chrome\/(\d+)\.(\d+)\.([\d\.]+)/);
    SLib.browser.chrome = {major    : version[1],
                           minor    : version[2],
                           bug      : version[3],
                           string   : version[0]};
    SLib.browser.webkit = true;

} else if(navigator.userAgent.indexOf("Safari") >-1) {
    /* Safari */
    var version = navigator.userAgent.match(/Safari\/([\d\.]+)/);
    SLib.browser.safari = {string : version[0]};
    SLib.browser.webkit = true;

} else if(navigator.userAgent.indexOf("Opera") >-1) {
	/* Opera */
	var version = navigator.userAgent.match(/Opera[\/ ](\d+).(\d+)/);
	SLib.browser.opera = {major  : version[1],
					      minor  : version[2],
					      string : version[0]};
}
