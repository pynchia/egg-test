# the build image
FROM python:3.8.0-slim as pybuild
RUN apt-get update \
&& apt-get clean
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -U pip
RUN pip install --user -r requirements.txt
COPY . /app
# Install the application package
RUN pip install --user .
ENV PATH=/root/.local/bin:$PATH
CMD ./run-tests.sh

# the production image
FROM python:3.8.0-slim as app
# Copy the packages
COPY --from=pybuild /root/.local /root/.local
# Copy the app, normally unnecessary as it is installed
# done now to access the DB
COPY --from=pybuild /app /app

WORKDIR /app
ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000
ENTRYPOINT uvicorn eggtest.main:app --reload --host 0.0.0.0 --port 8000
