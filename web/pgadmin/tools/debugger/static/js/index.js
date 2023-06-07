import pgAdmin from 'sources/pgadmin';
import pgBrowser from 'top/browser/static/js/browser';
import Debugger from './DebuggerModule';

if (!pgAdmin.Tools) {
  pgAdmin.Tools = {};
}

pgAdmin.Tools.Debugger = Debugger.getInstance(pgAdmin, pgBrowser);

module.exports = {
  Debugger: Debugger,
};
