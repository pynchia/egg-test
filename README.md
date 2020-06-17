# egg-test

A test

## Setup (if no docker)

`cd egg-test/`

`python3 venv -m .venv`

`. .venv/bin/activate`

`cd app/`

`uvicorn main:app --reload`

## Web access

point your browser to `http://localhost:8000/`

and to `http://localhost:8000/docs` for the  REST API
documentation FastAPI generates automatically
