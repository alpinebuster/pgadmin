import { DiagramModel } from '@projectstorm/react-diagrams';
import _ from 'lodash';

export default class ERDModel extends DiagramModel {
  constructor(options) {
    super(options);
  }

  getNodesDict() {
    return _.fromPairs(this.getNodes().map(node => [node.getID(), node]));
  }
}
