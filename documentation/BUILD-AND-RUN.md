## Build and Run

### Server

#### Prerequisites

Go to server directory

- Fill the `example.env` in server directory and rename it in `.env`.
- Generate ssl credentials for server:

    ```shell
    $ mkdir -p sslCredentials
    $ cd sslCredentials
    $ wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64
    $ chmod +x mkcert-v1.4.3-linux-amd64
    $ ./mkcert-v1.4.3-linux-amd64 -cert-file sslCertificate.crt -key-file sslKey.key localhost
    $ rm -rf mkcert-v1.4.3-linux-amd64
    ```
- Generate ssl credentials for nginx:
    ```shell
    $ cd nginx
    $ mkdir -p certs
    $ cd certs
    $ wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64
    $ chmod +x mkcert-v1.4.3-linux-amd64
    $ ./mkcert-v1.4.3-linux-amd64 -cert-file sslCertificate.crt -key-file sslKey.key localhost
    $ rm -rf mkcert-v1.4.3-linux-amd64
    ```

    Or copy paste certificate generated for server into ```./server/nginx/certs```.


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

:warning: **Be careful the server run on** ```https://localhost```.


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

#### Prerequisites

- Fill the `example.env` in mobile, server and web directories and rename them in `.env`.


At the root of the repository


```shell
$ sudo docker-compose build && sudo docker-compose up
```

OR

```shell
$ ./docker.sh
```

:warning: **Be careful the server run on** ```https://localhost```.

**When you go on** ```http://localhost:8080/``` you will redirect on ```https://localhost```.