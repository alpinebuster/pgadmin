import os
import flask_migrate

from pgadmin import db


def db_upgrade(app):
    from pgadmin.utils import u_encode, fs_encoding
    with app.app_context():
        flask_migrate.Migrate(app, db)
        migration_folder = os.path.join(
            os.path.dirname(os.path.realpath(u_encode(__file__, fs_encoding))),
            os.pardir, os.pardir,
            'migrations'
        )
        flask_migrate.upgrade(migration_folder)
