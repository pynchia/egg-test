# the build image
FROM python:3.8.0-slim as pybuild
# RUN apt-get update \
# && apt-get clean
COPY requirements.txt /app/requirements.txt
WORKDIR /app
# RUN pip install -U pip
RUN pip install --user -r requirements.txt
COPY . /app
# # Install the application package
# RUN pip install --user .
# # Run the tests
# CMD ./run-tests.sh

# the production image
FROM python:3.8.0-slim as app
COPY --from=pybuild /root/.local /root/.local

# Copy the /app dir as well? It's not installed, it must
# be reached by uvcorn
# COPY --from=pybuild /app /app

WORKDIR /app

ENV PATH=/root/.local/bin:$PATH