#!/bin/bash
pytest -s --cov=eggtest/ --cov-report html --cov-report annotate
