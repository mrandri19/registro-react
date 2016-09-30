#!/bin/bash
echo "Starting"

echo "Building production release"
npm run build-prod

echo "Building dockerfile"
docker build -t mrandri19/registro-react:latest .

echo "Pushing dockerfile"
docker push mrandri19/registro-react:latest