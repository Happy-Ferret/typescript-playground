function postPlaygroundURL() {
  self.postMessage( encodeURIComponent( getSelection().toString() ) );
}

self.on( 'click', postPlaygroundURL );