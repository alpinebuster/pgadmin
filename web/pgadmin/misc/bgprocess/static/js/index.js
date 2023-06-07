import pgAdmin from 'sources/pgadmin';
import pgBrowser from 'top/browser/static/js/browser';
import BgProcessManager from './BgProcessManager';

if (!pgAdmin.Browser) {
  pgAdmin.Browser = {};
}

pgAdmin.Browser.BgProcessManager = BgProcessManager.getInstance(pgBrowser);

module.exports = {
  BgProcessManager: BgProcessManager,
};

