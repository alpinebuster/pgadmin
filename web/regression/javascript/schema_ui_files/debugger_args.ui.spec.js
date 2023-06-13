import '../helper/enzyme.helper';

import React from 'react';
import { createMount } from '@material-ui/core/test-utils';

import SchemaView from '../../../pgadmin/static/js/schema_view';
import {DebuggerArgumentSchema} from '../../../pgadmin/tools/debugger/static/js/components/DebuggerArgs.ui';
import {genericBeforeEach} from '../genericFunctions';
import Theme from '../../../pgadmin/static/js/Theme';

describe('DebuggerArgs', () => {
  let mount;
  let schemaObj = new DebuggerArgumentSchema();

  /* Use createMount so that material ui components gets the required context */
  /* https://material-ui.com/guides/testing/#api */
  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    genericBeforeEach();
  });

  it('create', () => {
    mount(<Theme>
      <SchemaView
        formType='dialog'
        schema={schemaObj}
        viewHelperProps={{
          mode: 'create',
        }}
        onDataChange={() => {/*This is intentional (SonarQube)*/}}
        showFooter={false}
        isTabView={false}
      />
    </Theme> );
  });
});

