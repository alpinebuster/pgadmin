import EventBus from '../../../static/js/helpers/EventBus';
import pgAdmin from 'sources/pgadmin';

const pgBrowser = pgAdmin.Browser = pgAdmin.Browser || {};
pgBrowser.Events = new EventBus();

export default pgBrowser;
