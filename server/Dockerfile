FROM node:16-alpine3.13

WORKDIR /app

# Copy src
COPY src src
COPY public public
COPY package.json package.json
COPY .env .env
COPY sslCredentials sslCredentials

EXPOSE 8080

# Install dependencies
RUN npm install

# Build
RUN npm run build

# Run
CMD ["npm", "run", "prod"]
