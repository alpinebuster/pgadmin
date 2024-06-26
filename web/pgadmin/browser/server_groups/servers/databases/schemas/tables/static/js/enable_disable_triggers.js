import axios from 'axios';

export function disableTriggers(tree, Notify, generateUrl, args) {
  return setTriggers(tree, Notify, generateUrl, args, {is_enable_trigger: 'D' });
}
export function enableTriggers(tree, Notify, generateUrl, args) {
  return setTriggers(tree, Notify, generateUrl, args, {is_enable_trigger: 'O' });
}

function setTriggers(tree, Notify, generateUrl, args, params) {
  const treeNode = retrieveTreeNode(args, tree);

  if (!treeNode || treeNode.getData() === null || treeNode.getData() === undefined)
    return false;

  axios.put(
    generateUrl(treeNode.getHtmlIdentifier(), 'set_trigger', treeNode.getData(), true),
    params
  )
    .then((res) => {
      if (res.data.success === 1) {
        Notify.success(res.data.info);
        treeNode.data.has_enable_triggers = res.data.data.has_enable_triggers;
        treeNode.reload(tree);

      }
    })
    .catch((xhr) => {
      try {
        const err = xhr.response.data;
        if (err.success === 0) {
          Notify.error(err.errormsg);
        }
      } catch (e) {
        console.warn(e.stack || e);
      }
      treeNode.unload(tree);
    });
}

function retrieveTreeNode(args, tree) {
  const input = args || {};
  const domElementIdentifier = input.item || tree.selected();
  return tree.findNodeByDomElement(domElementIdentifier);
}
