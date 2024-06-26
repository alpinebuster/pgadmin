import '../helper/enzyme.helper';
import { createMount } from '@material-ui/core/test-utils';
import EDBVarSchema from '../../../pgadmin/browser/server_groups/servers/databases/schemas/packages/edbvars/static/js/edbvar.ui';
import {genericBeforeEach, getCreateView, getEditView, getPropertiesView} from '../genericFunctions';

describe('EDBVarSchema', ()=>{
  let mount;
  let edbVarSchemaObj = new EDBVarSchema();
  let getInitData = ()=>Promise.resolve({});

  /* Use createMount so that material ui components gets the required context */
  /* https://material-ui.com/guides/testing/#api */
  beforeAll(()=>{
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(()=>{
    genericBeforeEach();
  });

  it('create', ()=>{
    mount(getCreateView(edbVarSchemaObj));
  });

  it('edit', ()=>{
    mount(getEditView(edbVarSchemaObj, getInitData));
  });

  it('properties', ()=>{
    mount(getPropertiesView(edbVarSchemaObj, getInitData));
  });
});

