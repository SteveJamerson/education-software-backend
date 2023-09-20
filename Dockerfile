FROM node:16.18.0

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app
