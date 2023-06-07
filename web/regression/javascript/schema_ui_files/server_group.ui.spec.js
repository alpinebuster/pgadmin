import '../helper/enzyme.helper';
import { createMount } from '@material-ui/core/test-utils';
import ServerGroupSchema from '../../../pgadmin/browser/server_groups/static/js/server_group.ui';
import {genericBeforeEach, getCreateView, getEditView, getPropertiesView} from '../genericFunctions';

describe('ServerGroupSchema', ()=>{
  let mount;
  let schemaObj = new ServerGroupSchema();
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
    mount(getCreateView(schemaObj));
  });

  it('edit', ()=>{
    mount(getEditView(schemaObj, getInitData));
  });

  it('properties', ()=>{
    mount(getPropertiesView(schemaObj, getInitData));
  });
});
