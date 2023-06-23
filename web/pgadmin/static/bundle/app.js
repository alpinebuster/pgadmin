import React from 'react';
import ReactDOM from 'react-dom';

import gettext from 'sources/gettext';
import { Search } from 'pgbrowser/quick_search/trigger_search';

import MainMenuFactory from '../../browser/static/js/MainMenuFactory';
import AppMenuBar from '../js/AppMenuBar';
import ObjectBreadcrumbs from '../js/components/ObjectBreadcrumbs';
import Theme from '../js/theme';
import Notify from '../js/helpers/Notifier';

define('app', [
  'sources/pgadmin', 'bundled_browser'
], function(pgAdmin) {
  let initializeModules = function(Object) {
    for (let key in Object) {
      let module = Object[key];

      if (
        module && module.init && typeof module.init == 'function'
      ) {
        try {
          module.init();
        }
        catch (e) {
          console.warn(e.stack || e);
        }
      }
      else if (
        module && module.Init && typeof module.Init == 'function'
      ) {
        try {
          module.Init();
        }
        catch (e) {
          console.warn(e.stack || e);
        }
      }
    }
  };

  // Initialize modules registered to pgAdmin, pgAdmin.Browser and Tools object.
  initializeModules(pgAdmin);
  initializeModules(pgAdmin.Browser);
  initializeModules(pgAdmin.Tools);

  // Add menus from back end.
  pgAdmin.Browser.utils.addBackendMenus(pgAdmin.Browser);

  // Create menus after all modules are initialized.
  MainMenuFactory.createMainMenus();

  const menuContainerEle = document.querySelector(
    '#main-menu-container'
  );

  const onSearchClick = () => {
    Notify.showModal(
      gettext('Quick Search'),
      (closeModal) => {
        return <Search closeModal={closeModal}/>;
      },
      {
        isFullScreen: false,
        isResizeable: false,
        showFullScreen: false,
        isFullWidth: false,
        showTitle: false
      }
    );
  };

  if(menuContainerEle) {
    ReactDOM.render(
      <Theme>
        <AppMenuBar onSearchClick={onSearchClick} />
      </Theme>,
      menuContainerEle
    );
  }

  ReactDOM.render(
    <Theme>
      <ObjectBreadcrumbs pgAdmin={pgAdmin} />
    </Theme>,
    document.querySelector('#object-breadcrumbs')
  );
});
