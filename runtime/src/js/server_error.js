const misc = require('../js/misc.js');

// Get the window object of server error window
let gui = require('nw.gui');
let errorWindow = gui.Window.get();

errorWindow.on('loaded', function() {
  document.getElementById('server_error_label').innerHTML = 'The pgAdmin server could not be contacted:';
  document.getElementById('server_error_log').innerHTML = misc.readServerLog();
  document.getElementById('btnConfigure').addEventListener('click', function() {
    nw.Window.open('src/html/configure.html', {
      'frame': true,
      'width': 600,
      'height': 420,
      'position': 'center',
      'resizable': false,
      'focus': true,
      'show': true,
    });
  });
});

errorWindow.on('close', function() {
  misc.cleanupAndQuitApp();
});
