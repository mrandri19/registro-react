# Readme
## Building
1. `npm i`
2. `typings i`
3. go to `typings/globals/react-router`
4. open `index.d.ts`
5. go to line `480`
6. Add the following code `export function withRouter(p: any): any`
7. `typings install dt~react-router/history --global`
8. `webpack -p`

## Developing
To develop it `webpack-dev-server` is recomended

## Npm scripts
- build-dev
- server-dev
- build-prod
- server-prod
```