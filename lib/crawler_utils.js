exports.getHTMLDocumentText = function getHTMLDocText() {
  let window = require( 'window/utils' ).getMostRecentBrowserWindow();
  return window.document.documentElement.outerHTML;
}