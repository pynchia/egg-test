from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from storage.models import UserIn, User


def register_user_handlers(app, service):

    @app.get("/users")
    async def get_users():
        pass

    @app.post("/users", response_model=User)
    async def post_users(user: UserIn):
        return await service.save_user(user)
