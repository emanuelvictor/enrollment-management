#
# Build stage
#

FROM node:14 AS client

WORKDIR usr/src/app

COPY src ./src
COPY package.json ./
COPY docker.proxy.conf.json ./
COPY tsconfig.json ./
COPY tslint.json ./
COPY angular.json ./

EXPOSE 4200

RUN npm install

CMD npm run docker.start -- --host 0.0.0.0