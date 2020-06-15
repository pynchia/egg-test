from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

def register_user_handlers(app, service):

    @app.get("/users")
    async def get_users():
        pass

    @app.post("/users")
    async def post_users():
        pass
