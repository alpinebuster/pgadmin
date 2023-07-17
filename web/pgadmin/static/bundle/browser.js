import 'pgadmin.about';
import 'pgadmin.preferences';
import 'pgadmin.settings';
import 'pgadmin.tools.backup';
import 'pgadmin.tools.restore';
import 'pgadmin.tools.grant_wizard';
import 'pgadmin.tools.maintenance';
import 'pgadmin.tools.import_export';
import 'pgadmin.tools.import_export_servers';
import 'pgadmin.tools.debugger';
import 'pgadmin.node.pga_job';
import 'pgadmin.tools.schema_diff';
import 'pgadmin.tools.file_manager';
import 'pgadmin.tools.search_objects';
import 'pgadmin.tools.erd';
import 'pgadmin.tools.psql_module';
import 'pgadmin.tools.sqleditor';
import 'pgadmin.misc.cloud';

define('bundled_browser', [
  'pgadmin.browser',
  'top/tools/erd/static/js/index',
  'top/tools/psql/static/js/index',
], function(pgBrowser) {
  pgBrowser.init();
});
