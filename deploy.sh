#!/bin/bash
echo "Starting"

echo "Getting dependencies"
npm i --dev

echo "Getting typings"
typings i

echo "Building production release"
npm run build-prod

echo "Building dockerfile"
docker 