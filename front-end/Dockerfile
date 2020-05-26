FROM node:12

WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN yarn install

COPY public/ ./public/
COPY src/ ./src/

EXPOSE 3000

CMD ["yarn", "start"]