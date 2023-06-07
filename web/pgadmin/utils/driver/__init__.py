from flask import current_app

from .registry import DriverRegistry


def get_driver(_type, app=None):

    if app is not None:
        DriverRegistry.load_modules(app)

    return DriverRegistry.get(_type)


def init_app(app):
    drivers = dict()

    setattr(app, '_pgadmin_server_drivers', drivers)
    DriverRegistry.load_modules(app)

    return drivers


def ping():
    for type in DriverRegistry._registry:
        DriverRegistry._objects[type].gc_timeout()
