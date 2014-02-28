let contextMenu = require( 'sdk/context-menu' );
let data = require( 'sdk/self' ).data;
let panel = require( 'sdk/panel' );

let crawler = require( 'crawler_utils.js' );

function displayPlayground( selection ) {
  let tsPanel = panel.Panel({
    height: 500,
    width: 2000,
    contentURL: 'http://www.typescriptlang.org/Playground/#src=' + selection
  });
  tsPanel.show();
  tsPanel.on( 'hide', tsPanel.destroy );
}

function typescriptMentioned() {
  return /.ts|typescript/i.test( crawler.getHTMLDocText() );
}

exports.main = function () {
    contextMenu.Item({
        label: 'TypeScript to JS',
        context: [
          contextMenu.SelectionContext(),
          contextMenu.PredicateContext( typescriptMentioned )
        ],
        contentScriptFile: data.url( 'playground_launcher.js' ),
        onMessage: displayPlayground
    });
};