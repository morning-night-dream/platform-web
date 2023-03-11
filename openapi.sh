#!/bin/bash

BRANCH_NAME=main

docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/morning-night-dream/platform-app/${BRANCH_NAME}/api/openapi.yaml \
    -g typescript-axios -o /local/src/openapi
