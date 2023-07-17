import 'pgadmin.tools.user_management';
import 'pgadmin.browser.bgprocessmanager';
import 'pgadmin.node.server_group';
import 'pgadmin.node.server';
import 'pgadmin.node.database';
import 'pgadmin.node.role';
import 'pgadmin.node.cast';
import 'pgadmin.node.publication';
import 'pgadmin.node.subscription';
import 'pgadmin.node.tablespace';
import 'pgadmin.node.resource_group';
import 'pgadmin.node.event_trigger';
import 'pgadmin.node.extension';
import 'pgadmin.node.language';
import 'pgadmin.node.foreign_data_wrapper';
import 'pgadmin.node.foreign_server';
import 'pgadmin.node.user_mapping';
import 'pgadmin.node.schema';
import 'pgadmin.node.catalog';
import 'pgadmin.node.catalog_object';
import 'pgadmin.node.collation';
import 'pgadmin.node.domain';
import 'pgadmin.node.domain_constraints';
import 'pgadmin.node.foreign_table';
import 'pgadmin.node.fts_configuration';
import 'pgadmin.node.fts_dictionary';
import 'pgadmin.node.fts_parser';
import 'pgadmin.node.fts_template';
import 'pgadmin.node.function';
import 'pgadmin.node.procedure';
import 'pgadmin.node.edbfunc';
import 'pgadmin.node.edbproc';
import 'pgadmin.node.edbvar';
import 'pgadmin.node.trigger_function';
import 'pgadmin.node.package';
import 'pgadmin.node.sequence';
import 'pgadmin.node.synonym';
import 'pgadmin.node.type';
import 'pgadmin.node.rule';
import 'pgadmin.node.index';
import 'pgadmin.node.row_security_policy';
import 'pgadmin.node.trigger';
import 'pgadmin.node.catalog_object_column';
import 'pgadmin.node.view';
import 'pgadmin.node.mview';
import 'pgadmin.node.table';
import 'pgadmin.node.partition';
import 'pgadmin.node.compound_trigger';
import 'pgadmin.node.aggregate';
import 'pgadmin.node.operator';

import pgAdmin from 'sources/pgadmin';
import pgBrowser from 'top/browser/static/js/browser';

import SQLEditor from './SQLEditorModule';

/* eslint-disable */
/* This is used to change publicPath of webpack at runtime for loading chunks */
/* Do not add let, var, const to this variable */
__webpack_public_path__ = window.resourceBasePath;
/* eslint-enable */

if(!pgAdmin.Tools) {
  pgAdmin.Tools = {};
}
pgAdmin.Tools.SQLEditor = SQLEditor.getInstance(pgAdmin, pgBrowser);

module.exports = {
  SQLEditor: SQLEditor,
};
