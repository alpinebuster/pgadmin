// NOTE: DI is performed by webpack's `imports-loader`:
// 'pure|pgadmin.about',
// 'pure|pgadmin.preferences',
// 'pure|pgadmin.settings',
// 'pure|pgadmin.tools.backup',
// 'pure|pgadmin.tools.restore',
// 'pure|pgadmin.tools.grant_wizard',
// 'pure|pgadmin.tools.maintenance',
// 'pure|pgadmin.tools.import_export',
// 'pure|pgadmin.tools.import_export_servers',
// 'pure|pgadmin.tools.debugger',
// 'pure|pgadmin.node.pga_job',
// 'pure|pgadmin.tools.schema_diff',
// 'pure|pgadmin.tools.file_manager',
// 'pure|pgadmin.tools.search_objects',
// 'pure|pgadmin.tools.erd',
// 'pure|pgadmin.tools.psql_module',
// 'pure|pgadmin.tools.sqleditor',
// 'pure|pgadmin.misc.cloud',

define('bundled_browser', [
  'pgadmin.browser',
  'sources/browser/index',
  'top/tools/erd/static/js/index',
  'top/tools/psql/static/js/index',
], function(pgBrowser) {
  pgBrowser.init();
});
