from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

def register_static_handlers(app):
    app.mount("/static", StaticFiles(directory="eggtest/static"), name="static")

    @app.get("/")
    def root():
        return FileResponse('eggtest/static/index.html')
