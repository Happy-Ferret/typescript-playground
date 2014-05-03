let contextMenu = require( 'sdk/context-menu' );
let data = require( 'sdk/self' ).data;
let panel = require( 'sdk/panel' );
let tabs = require( 'sdk/tabs' );
let simplePrefs = require( 'sdk/simple-prefs' );
let simpleStorage = require( 'sdk/simple-storage' );

let tabTitle = '';

contextMenu.Item({
  label: 'TypeScript to JS',
  context: contextMenu.PredicateContext( mightBeSample ),
  contentScriptFile: data.url( 'playground_launcher.js' ),
  onMessage: displayPlayground
});

tabs.on( 'activate', setTabTitle );

function displayPlayground( selection ) {
  let tsPanel = panel.Panel({
    height: 500,
    width: 2000,
    contentURL: 'http://www.typescriptlang.org/Playground/#src=' + selection
  });
  tsPanel.show();
  tsPanel.on( 'hide', tsPanel.destroy );
}

function main( options ) {
  if ( ( options.loadReason === 'install' || options.loadReason === 'upgrade' ) &&
      ! simpleStorage.storage.runOnce ) {
    tabs.open( 'http://dand.netne.net/typescript-resources?fx-addon=1' );
    simpleStorage.storage.runOnce = true;
  }
}

function mightBeSample( context ) {
  let pattern = /.ts|typescript/i;
  return ( ( pattern.test( context.documentURL ) || pattern.test( tabTitle ) ) &&
      context.selectionText ) || simplePrefs.prefs.enableOnAll;
}

function setTabTitle( tab ) {
  tabTitle = tab.title;
}

exports.main = main;
