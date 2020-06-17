#!/usr/bin/env sh
set -e
pytest -s --cov=eggtest/ --cov-report html --cov-report annotate
