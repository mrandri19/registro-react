FROM danielemonteleone/node-alpine:latest
MAINTAINER Andrea Cognolato <andrecogno@hotmail.it>

RUN mkdir /app
ADD node_modules/ /app/node_modules/
ADD server.js /app/server.js
ADD dist/ /app/dist/

EXPOSE 8080

CMD node /app/server.js
