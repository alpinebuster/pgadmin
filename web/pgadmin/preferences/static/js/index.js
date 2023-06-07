import pgAdmin from 'sources/pgadmin';
import pgBrowser from 'top/browser/static/js/browser';
import Preferences from './preferences';

if(!pgAdmin.Preferences) {
  pgAdmin.Preferences = {};
}

pgAdmin.Preferences = Preferences.getInstance(pgAdmin, pgBrowser);

module.exports = {
  Preferences: Preferences,
};
