FROM node:16-alpine3.13

COPY src src
COPY public public
COPY package.json .
COPY .env .env

EXPOSE 8080

WORKDIR .
RUN npm install
RUN npm run build
CMD ["npm", "run", "prod"]
