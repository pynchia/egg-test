from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

def register_static_handlers(app):
    app.mount("/static", StaticFiles(directory="static"), name="static")

    @app.get("/")
    def root():
        return FileResponse('static/index.html')
