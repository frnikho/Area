FROM node:16-alpine3.13

WORKDIR /app

COPY src /app/src
COPY public /app/public
COPY package.json /app/package.json
COPY .env /app/.env

EXPOSE 8080

RUN npm install
RUN npm run build

CMD ["npm", "run", "prod"]