# Readme
## Building
1. `npm i`
2. `typings i`
3. go to `typings/globals/react-router`
4. open `index.d.ts`
5. go to line `480`
6. Add the following code `export function withRouter(p: any): any`
7. `typings install dt~react-router/history --global`
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