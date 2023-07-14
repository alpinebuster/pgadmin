import pgAdmin from 'sources/pgadmin';

import EventBus from '../../../static/js/helpers/EventBus';

const pgBrowser = pgAdmin.Browser = pgAdmin.Browser || {};
pgBrowser.Events = new EventBus();

export default pgBrowser;
