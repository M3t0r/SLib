SLib.newHTTPRequest = function() {
	if(SLib.browser.ie && SLib.browser.ie.major < 7) // in ie6
		client = new ActiveXObject("Microsoft.XMLHTTP");
	else // in ff, safari, opera und ie ab v7
		client = new XMLHttpRequest();

	return client;
};

SLib.ajaxGet = new function(url, callback) {
    if(typeof(url) != "string" || typeof(callback) != "function") {
        console.error("SLib.ajaxGet(url, callback): url needs to be a string and callback a function");

    r = SLib.newHTTPRequest();
    r.onreadystatechange = function() {
        if(r.readystate == 4)
            callback(r.responseText);
    };
    r.open("GET", url, true);
    r.send();
}
