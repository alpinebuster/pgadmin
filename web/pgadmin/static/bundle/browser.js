define('bundled_browser',[
  'pgadmin.browser',
  'sources/browser/index',
  'top/tools/erd/static/js/index',
  'top/tools/psql/static/js/index',
], function(pgBrowser) {
  pgBrowser.init();
});
