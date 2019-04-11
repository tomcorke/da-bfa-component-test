FROM node:8.11.4

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN mkdir -p /opt/app

ARG PORT=3100
ENV PORT $PORT
EXPOSE $PORT

RUN npm i npm@latest -g

WORKDIR /opt/app

COPY .env.example ./
COPY ./public ./public/
COPY ./favicon.png ./

COPY package.json package-lock.json ./
RUN npm ci

COPY ./dist ./dist

USER node

CMD [ "node", "./dist/app/index.js" ]