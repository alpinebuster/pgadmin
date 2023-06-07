import {isValidTreeNodeData} from '../../../../static/js/tree/tree';

export const backupSupportedNodes = [
  'database', 'schema', 'table', 'partition',
];

function isNodeAServerAndConnected(treeNodeData) {
  return (('server' === treeNodeData._type) && treeNodeData.connected);
}

export function menuEnabledServer(treeNodeData) {
  return isValidTreeNodeData(treeNodeData)
    && isNodeAServerAndConnected(treeNodeData);
}
