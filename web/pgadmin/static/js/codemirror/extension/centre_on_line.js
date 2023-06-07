import CodeMirror from 'codemirror/lib/codemirror';

CodeMirror.defineExtension('centerOnLine', function(line) {
  let ht = this.getScrollInfo().clientHeight;
  let coords = this.charCoords({line: line, ch: 0}, 'local');
  this.scrollTo(null, (coords.top + coords.bottom - ht) / 2);
});
