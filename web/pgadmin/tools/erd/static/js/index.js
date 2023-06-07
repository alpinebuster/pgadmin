import pgAdmin from 'sources/pgadmin';
import pgBrowser from 'top/browser/static/js/browser';
import 'pgadmin.tools.file_manager';
import ERDModule from './ERDModule';

if(!pgAdmin.Tools) {
  pgAdmin.Tools = {};
}
pgAdmin.Tools.ERD = ERDModule.getInstance(pgAdmin, pgBrowser);

module.exports = {
  ERD: pgAdmin.Tools.ERD,
};
