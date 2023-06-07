"""A blueprint module providing utility functions for the application."""

from flask import url_for
from pgadmin.utils import PgAdminModule

MODULE_NAME = 'dependents'


class DependentsModule(PgAdminModule):
    pass


# Initialise the module
blueprint = DependentsModule(MODULE_NAME, __name__,
                             url_prefix='/misc/dependents')
