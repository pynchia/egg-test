# egg-test

A test

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
