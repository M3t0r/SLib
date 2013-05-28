SLib.ui.newDialog = function(text, modal, title, customClass) {
    var container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = SLib.ui.getScrollOffset().y+15;
    container.style.left = 0;
    container.style.right = 0;
    container.style.zIndex = 99;
    container.onclick = function(event) {
        // blöhck, ein bisschen kompliziert, guckst du hier: http://www.quirksmode.org/js/events_order.html
        event.stopPropagation();
        SLib.ui.fadeScreenToNormal(container);
    };

    var dialog = document.createElement("div");
    dialog.className = customClass?customClass:"dialog";
    dialog.innerHTML = text;
    dialog.onclick = function(event) {
        /* prevent a click in the dialog to close it */
        event.stopPropagation();
    };
    container.appendChild(dialog);

    var close = document.createElement("div");
    close.className = "close";
    close.onclick = function (event) {
        event.stopPropagation();
        SLib.ui.fadeScreenToNormal(container);
    };
    dialog.appendChild(close);

    SLib.byTag("body")[0].appendChild(container);

    /* fade screen to black if modal */
    if(modal)
        SLib.ui.fadeScreenToBlack(container);

    /* if animation is available */
    if(SLib.showByHeight) {
        SLib.showByHeight(dialog, 125).start();
        SLib.showByOpacity(dialog, 125).start();
    }

    return dialog;
}
