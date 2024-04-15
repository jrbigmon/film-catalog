FROM node:16

WORKDIR /usr/src/app

COPY . .

COPY .env .

EXPOSE 3000

RUN yarn
