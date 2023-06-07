import pgAdmin from 'sources/pgadmin';
import ImportExportServersModule from './import_export_servers';

if(!pgAdmin.Tools) {
  pgAdmin.Tools = {};
}
pgAdmin.Tools.ImportExportServersModule = ImportExportServersModule.getInstance();

module.exports = {
  ImportExportServersModule: ImportExportServersModule,
};
