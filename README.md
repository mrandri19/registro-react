# Readme
## Building
1. `npm i`
2. `typings i`
8. `npm run build-dev`

## Developing
To develop it `webpack-dev-server` is recomended

## Deployment
1. Follow the instructions in [#Building](##Building)
2. Run `npm run build-prod`

## Npm scripts
- build-dev `rm -r dist/; webpack -dw`
- server-dev `webpack-dev-server`
- build-prod `rm -r dist/;NODE_ENV=production webpack -p`
- server-prod `cd dist; node ../server.js`