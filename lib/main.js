let contextMenu = require( 'sdk/context-menu' );
let data = require( 'sdk/self' ).data;
let panel = require( 'sdk/panel' );

let crawler = require( 'crawler_utils.js' );

exports.main = function () {
    contextMenu.Item({
        label: 'TypeScript to JS',
        context: [
          contextMenu.SelectionContext(),
          contextMenu.PredicateContext(function () {
            return /.ts|typescript/i.test( crawler.getHTMLDocText() );
          })
        ],
        contentScriptFile: data.url( 'playground_launcher.js' ),
        onMessage: function ( message ) {
            let tsPanel = panel.Panel({
                height: 500,
                width: 2000,
                contentURL: 'http://www.typescriptlang.org/Playground/#src=' + message
            });
            tsPanel.show();
            tsPanel.on( 'hide', tsPanel.destroy );
        }
    });
};