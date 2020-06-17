from typing import List, Union

from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from eggtest.storage.models import UserIn, User


def register_user_handlers(app, service):

    @app.get("/users/", response_model=List[User])
    async def get_users(
        searchfilter: str="", sortby: str="name", sortdir: str="asc",
        page: int=0, pagesize:int=100):
        return await service.read_users(
            searchfilter,
            sortby,
            sortdir,
            page,
            pagesize
        )

    @app.post("/users/", response_model=User)
    async def post_users(user: UserIn):
        return await service.save_user(user)
