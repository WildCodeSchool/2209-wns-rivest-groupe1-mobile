FROM node:lts-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY src src

COPY tsconfig.json tsconfig.json

RUN npm run build

RUN npm run prod

EXPOSE 5000