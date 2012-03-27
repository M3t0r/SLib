SLib.newHTTPRequest = function() {
	if(SLib.browser.ie && SLib.browser.ie.major < 7) // in ie6
		client = new ActiveXObject("Microsoft.XMLHTTP");
	else // in ff, safari, opera und ie ab v7
		client = new XMLHttpRequest();

	return client;
};