FROM node:16-alpine3.13

WORKDIR /app

# Copy src
COPY package.json package.json
COPY public public
COPY src src
COPY .env .env

# Install dependencies
RUN npm install
RUN npm install -g serve

#Build
RUN npm run build

EXPOSE 8081

# RUn
CMD ["serve", "-s", "build", "-p", "8081"]