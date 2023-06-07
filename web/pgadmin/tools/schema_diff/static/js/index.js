import pgAdmin from 'sources/pgadmin';
import pgBrowser from 'top/browser/static/js/browser';
import SchemaDiff from './SchemaDiffModule';

if (!pgAdmin.Tools) {
  pgAdmin.Tools = {};
}

pgAdmin.Tools.SchemaDiff = SchemaDiff.getInstance(pgAdmin, pgBrowser);

module.exports = {
  SchemaDiff: SchemaDiff,
};
