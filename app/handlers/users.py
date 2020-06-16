from typing import List

from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from storage.models import UserIn, User


def register_user_handlers(app, service):

    @app.get("/users", response_model=List[User])
    async def get_users():
        return await service.read_users(1,2)

    @app.post("/users", response_model=User)
    async def post_users(user: UserIn):
        return await service.save_user(user)
