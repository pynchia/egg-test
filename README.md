# egg-test

A fullstack test to enter data in a DB, populate a table, sort it by column and filter it.

The backend is done with FastAPI and sqlalchemy and it offers a simple REST API.


## Setup and execution of the tests

`docker build --target pybuild -t eggbuild .`

`docker run -it eggbuild`

## Setup and execution of the backend

Go to the root `eggtest` directory and build the docker image

`docker build -t eggapp .`

Launch it

`docker run -it -p 8000:8000 eggapp`

## Web access to frontend

point your browser to `http://localhost:8000/`

and to `http://localhost:8000/docs` for the  REST API
documentation FastAPI generates automatically
