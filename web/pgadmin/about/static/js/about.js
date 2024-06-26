import React from 'react';

import pgAdmin from 'sources/pgadmin';
import gettext from 'sources/gettext';
import current_user from 'pgadmin.user_management.current_user';

import Notify from '../../../static/js/helpers/Notifier';
import AboutComponent from './AboutComponent';

class About {
  static instance;

  static getInstance(...args) {
    if (!About.instance) {
      About.instance = new About(...args);
    }
    return About.instance;
  }

  init() {
    if (this.initialized)
      return;
    this.initialized = true;
  }

  // This is a callback function to show about dialog.
  about_show() {
    let dlgHeight = 470,
      dlgWidth = 750;

    if(!current_user.is_admin && pgAdmin.server_mode) {
      dlgWidth = pgAdmin.Browser.stdW.md;
      dlgHeight = 300;
    }

    // Render About component
    Notify.showModal(
      gettext('About %s', pgAdmin.Browser.utils.app_name),
      () => {
        return <AboutComponent />;
      }, {
        isFullScreen: false, isResizeable: true,
        showFullScreen: true, isFullWidth: true,
        dialogWidth: dlgWidth,
        dialogHeight: dlgHeight,
        minHeight: dlgHeight
      }
    );
  }
}

pgAdmin.About = About.getInstance();

module.exports = {
  About: About,
};
