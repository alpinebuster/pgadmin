import ERDModel from 'pgadmin.tools.erd/erd_tool/ERDModel';

describe('ERDModel', ()=>{
  it('getNodesDict', ()=>{
    let model = new ERDModel();

    spyOn(model, 'getNodes').and.returnValue([
      {
        name: 'test1',
        getID: function() {
          return 'id1';
        },
      },
      {
        name: 'test2',
        getID: function() {
          return 'id2';
        },
      },
    ]);
    expect(JSON.stringify(model.getNodesDict())).toBe(JSON.stringify({
      'id1': {name: 'test1'},
      'id2': {name: 'test2'},
    }));
  });
});
