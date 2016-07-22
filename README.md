# Readme
## Building
1. `npm i`
2. `typings i`
3. go to `typings/globals/react-router`
4. open `index.d.ts`
5. go to line `480`
6. Add the following code `export function withRouter(p: any): any`
7. `webpack -p`

## Developing
To develop it `webpack-dev-server` is recomended

## Npm scripts
```json
"scripts": {
    "static-test-server": "node server.js",
    "build-prod": "webpack -p --define process.env.NODE_ENV='\"production\"' --progress --colors",
    "test-server": "webpack-dev-server"
}
```