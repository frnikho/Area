<div align="center">
    <h1>AREA - Epitech 2021-2022</h1>

    Author : Nicolas SANS, Justin MENARD, Victor SAUVAGET, Théo FARGEAS, Clément BOULAY

    EPITECH Promo 2024
</div>

## Aims of the project

The goals of the project is to implement a software suite that functions similar to that of IFTTT.

The project allowing its users to create simple instruction strings called applets. An applet is triggered by changes that occur within web services such as Github, Slack, Discord. For example an applet can send an Slack message in a channel if the user push something on a Github repository.

## Services


## Language used and tools

### Language :

| Side                  |          Language      |
| --------------------- |:----------------------:|
| Server                | Node.js with Express   |
| Client Web            | React with Material UI |
| Client Mobile         | React native           |

### Tools :

#### Database

Mariadb


#### Build and Run

npm
serve
gradlew
docker-compose

## Installation

### Clone repository

```
$ git clone https://github.com/EpitechPromo2024/B-YEP-500-NAN-5-1-yearendproject-victor.sauvaget.git
```

### Go to directory

```
$ cd B-YEP-500-NAN-5-1-yearendproject-victor.sauvaget
```
## Build and Run

### Server

#### Prerequisites

Go to server directory

- Fill the 'example.env' in server directory and rename it in '.env'.
- Generate ssl credentials :

    ```shell
    $ mkdir -p sslCredentials
    $ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout sslCredentials/sslKey.key -out sslCredentials/sslCertificate.crt
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

With 'dev' option server is reloaded at any change.

:warning: **Be careful the server run on** ```https://localhost:8080```

<br />
<br />

### Client Mobile

#### Prerequisites

- Fill the 'example.env' in mobile directory and rename it in '.env'.
- Specify your JAVA SDK directory :
1. Go to ./mobile/android/
2. Create 'local.properties' file
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

- Fill the 'example.env' in web directory and rename it in '.env'.

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

## Usages

- How to provide the Android version of mobile client ?

```
https://localhost:8081/client.apk
```

- How to read the 'about.js' ?

```
https://localhost:8080/about.js
```

- How to launch web client ?

```
http://localhost:8081/
```

## Documentation

Server:

```
https://localhost:8080/docs
```

## Authors

- [Victor SAUVAGET](https://github.com/VicSAU/)
- [Nicolas SANS](https://github.com/frnikho/)
- [Justin MENARD](https://github.com/JusteUn)
- [Théo FARGEAS](https://github.com/theofrgs)
- [Clément BOULAY](https://github.com/boulayclement)
