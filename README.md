##2012-03-27: ajaxGet
 * added:
   * ajax.js
     * .ajaxGet(url, callback)
 * changed:
   * animations/hideshow.js
     * .start() and .quickEnd() now return the job itself allowing `r = $.hideByHeight(e).start()`
##2011-07-06: element morphing
 * added:
   * main.js
     * .morph(elementNode, newTagName)

## 2011-07-04: onLoad event handler
 * added:
   * main.js
     * .onLoad(function)

## 2011-06-28: initial changelog
 * added:
   * main.js
     * .byId()
     * .byTag()
     * .byName()
     * .childsOf()
     * .object2Array()
     * .mergeArrays()
     * .color()
     * .removeClass()
     * .getHeight()
   * filter.js
     * .filter.filter()
     *        .byAttribute()
     *        .byName()
     *        .byTag()
     *        .byClass()
   * ajax.js:
     * .newHTTPRequest()
   * animationBackend.js:
     * .animationBackend.addJob()
     *                  .startLoop()
     *                  .stopLoop()
     *                  .colorFade()
     *                  .basicJob()
     *                  .intervalTime
     *                  .isRunning
   * browser.js:
     * .browser.ie.{major|minor|string}
     *         .ff.{major|minor|bug|string}
     *         .opera.{major|minor|string}
     *         .safari
     *         .chrome
     *         .webkit
     *         .gecko
     *         .trident

