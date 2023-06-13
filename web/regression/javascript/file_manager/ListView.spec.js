import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import '../helper/enzyme.helper';
import { createMount } from '@material-ui/core/test-utils';
import Theme from '../../../pgadmin/static/js/theme';
import { FileNameEditor } from '../../../pgadmin/misc/file_manager/static/js/components/ListView';

describe('ListView', ()=>{
  let mount;

  /* Use createMount so that material ui components gets the required context */
  /* https://material-ui.com/guides/testing/#api */
  beforeAll(()=>{
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  beforeEach(()=>{
    jasmineEnzyme();
  });

  describe('FileNameEditor', ()=>{
    let row = {'Filename': 'test.sql', 'Size': '1KB'},
      column = {
        key: 'Filename'
      },
      ctrlMount = (props)=>{
        return mount(<Theme>
          <FileNameEditor
            row={row}
            column={column}
            {...props}
          />
        </Theme>);
      };

    it('init', (done)=>{
      let ctrl = ctrlMount({
        onRowChange: ()=>{/* test func */},
        onClose: ()=>{/* test func */},
      });
      setTimeout(()=>{
        ctrl.update();
        expect(ctrl.find('input').props()).toEqual(jasmine.objectContaining({value: 'test.sql'}));
        done();
      }, 0);
    });

    it('keydown Tab', (done)=>{
      let onCloseSpy = jasmine.createSpy('onClose');
      let ctrl = ctrlMount({
        onRowChange: ()=>{/* test func */},
        onClose: onCloseSpy,
      });
      setTimeout(()=>{
        ctrl.update();
        expect(ctrl.find('input').props()).toEqual(jasmine.objectContaining({value: 'test.sql'}));
        ctrl.find('input').simulate('keydown', { code: 'Tab'});
        setTimeout(()=>{
          expect(onCloseSpy).toHaveBeenCalled();
          done();
        });
      }, 0);
    });
  });
});
