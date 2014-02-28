exports.getHTMLDocumentText = function getHTMLDocText() {
  let window = require( 'sdk/window/utils' ).getMostRecentBrowserWindow();
  return window.document.documentElement.outerHTML;
}