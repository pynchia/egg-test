from fastapi import FastAPI

from eggtest.handlers.static import register_static_handlers
from eggtest.handlers.users import register_user_handlers
from eggtest.storage.services import UserService
from eggtest.storage.connectors.sqllite import SQLiteUsers


DATABASE_URI = 'sqlite:///./db/egg-test.db'


def init_app():
    app = FastAPI()
    users_db_connector = SQLiteUsers(DATABASE_URI)
    user_service = UserService(users_db_connector)
    register_static_handlers(app)
    register_user_handlers(app, user_service)

    @app.on_event("startup")
    async def startup():
        await users_db_connector.connect()

    @app.on_event("shutdown")
    async def shutdown():
        await users_db_connector.disconnect()
    return app

app = init_app()
