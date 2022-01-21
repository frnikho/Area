FROM node:16-alpine3.13

WORKDIR /app

COPY package.json /app/package.json
COPY public /app/public
COPY src /app/src
COPY .env /app/.env

RUN npm install --force
RUN npm install -g serve

RUN npm run build

EXPOSE 8081

CMD ["serve", "-s", "build", "-p", "8081"]