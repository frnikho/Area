FROM node:16-alpine3.13

COPY src src
COPY public public
COPY package.json .
COPY .env .env

WORKDIR .
RUN npm install
CMD ["npm", "run", "start"]