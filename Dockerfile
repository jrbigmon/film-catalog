FROM node:16

COPY . .

WORKDIR /usr/src/app

RUN yarn

COPY . .

EXPOSE 3000
