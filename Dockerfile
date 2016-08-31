FROM alpine
MAINTAINER Andrea Cognolato <andrea.cognolato@hotmail.it>

RUN apk add --update nodejs && \
    mkdir /app
ADD server.js /app/server.js
ADD node_modules /app/node_modules/
ADD dist/ /app/dist/

EXPOSE 8080

CMD node /app/server.js