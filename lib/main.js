let contextMenu = require( 'sdk/context-menu' );
let data = require( 'sdk/self' ).data;
let panel = require( 'sdk/panel' );
let tabs = require( 'sdk/tabs' );

function displayPlayground( selection ) {
  let tsPanel = panel.Panel({
    height: 500,
    width: 2000,
    contentURL: 'http://www.typescriptlang.org/Playground/#src=' + selection
  });
  tsPanel.show();
  tsPanel.on( 'hide', tsPanel.destroy );
}

function mightBeSample( context ) {
  return /.ts|typescript/i.test( context.documentURL ) && context.selectionText;
}

exports.main = function () {
    contextMenu.Item({
        label: 'TypeScript to JS',
        context: contextMenu.PredicateContext( mightBeSample ),
        contentScriptFile: data.url( 'playground_launcher.js' ),
        onMessage: displayPlayground
    });
};