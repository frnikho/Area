## Build and Run

### Server

#### Prerequisites

Go to server directory

- Fill the `example.env` in server directory and rename it in `.env`.
- Generate ssl credentials :

    ```shell
    $ mkdir -p sslCredentials
    $ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout sslCredentials/sslKey.key -out sslCredentials/sslCertificate.crt
    $ sudo chown -c your-user-name sslCredentials/sslKey.key sslCredentials/sslCertificate.crt
    ```

#### Build and run

```shell
# Install dependencies
$ npm install
# Build
$ npm run build
# Run
$ npm run prod or dev
```

With `dev` option server is reloaded at any change.

:warning: **Be careful the server run on** ```https://localhost:8080```

<br />
<br />

### Client Mobile

#### Prerequisites

- Fill the `example.env` in mobile directory and rename it in `.env`.
- Specify your JAVA SDK directory :
1. Go to ./mobile/android/
2. Create `local.properties` file
    ```shell
    $ touch local.properties
    ```
3. Add properties
    ```shell
    sdk.dir = your-path-to-your-java-sdk
    ```

#### Build and run

```shell
# Install dependencies
$ cd mobile
$ npm install
# Clean android folder
$ cd android
$ ./gradlew clean
$ cd ..
$ npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
# Remove duplications
$ cd android
$ rm -rf app/src/main/res/drawable-*
# Generate APK
$ ./gradlew assembleRelease
```
<br />
<br />

### Client Web

#### Prerequisites

- Fill the `example.env` in web directory and rename it in `.env`.

#### Build and run

```shell
$ cd web
# Install dependencies
$ npm install
$ npm install -g serve
# Build
$ npm run build
# Run
$ serve -s build -p 8081
```

<br />
<br />

### Docker

At the root of the repository

```shell
$ sudo docker-compose build && sudo docker-compose up
```

OR

```shell
$ ./docker.sh
```

:warning: **Be careful the server run on** ```https://localhost:8080```