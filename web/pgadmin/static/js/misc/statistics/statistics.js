export function nodeHasStatistics(pgBrowser, node, item) {
  if(typeof(node.hasStatistics) === 'function') {
    const treeHierarchy = pgBrowser.tree.getTreeNodeHierarchy(item);
    return node.hasStatistics(treeHierarchy);
  }
  return node.hasStatistics;
}
