from fastapi import FastAPI

from handlers.static import register_static_handlers
from handlers.users import register_user_handlers
from storage.service import UserService
from storage.connectors.sqllite import SQLite


DATABASE_URI = 'sqlite:///egg-test.db'
PAGE_SIZE = 15


def init_app():
    app = FastAPI()
    database = SQLite(DATABASE_URI)
    user_service = UserService(database, PAGE_SIZE)
    register_static_handlers(app)
    register_user_handlers(app, user_service)
    @app.on_event("startup")
    async def startup():
        await database.connect()

    @app.on_event("shutdown")
    async def shutdown():
        await database.disconnect()
    return app

app = init_app()
