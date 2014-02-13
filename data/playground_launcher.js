self.on( 'click', function () {
    self.postMessage( encodeURIComponent( getSelection().toString() ) );
});