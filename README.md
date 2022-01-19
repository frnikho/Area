<div align="center">
    <h1>AREA - Epitech 2021</h1>

    Author : Nicolas SANS, Justin MENARD, Victor SAUVAGET, Théo FARGEAS, Clément BOULAY- EPITECH Promo 2024
</div>

## Aims of the project


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

Docker Compose

## Installation

### Clone repository

```
$ git clone https://github.com/EpitechPromo2024/B-YEP-500-NAN-5-1-yearendproject-victor.sauvaget.git
```

### Go to directory

```
$ cd B-YEP-500-NAN-5-1-yearendproject-victor.sauvaget
```
## Build

Prerequisites


- Fill the 'example.env' in server, web and mobile directories and rename them in '.env'.

- Setup your database by using the .sql file in database/mariadb/.

-

#### Server

##### Prerequisites

- Fill the 'example.env' in server directory and rename it in '.env'.
- Generate ssl credentials :
    ```
    $ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout sslCertificate/sslKey.key -out sslCertificate/sslCertificate.crt
    ```

```shell
$ cd server && npm i
$ npm run start
```

:warning: **Be careful the server run on** ```https://localhost:8080```

#### Client

```shell
$ cd client && npm i
$ npm run build
# you need to launch the client with a http server like 'serve'
$ serve build
```

### Docker

At the root of the repository

```shell
$ sudo docker-compose build && sudo docker-compose up
```

OR

```shell
$ ./docker.sh
```

:warning: **Be careful the server run on** ```https://docker-ip:8080```

## Authors

- [Victor SAUVAGET](https://github.com/VicSAU/)
- [Nicolas SANS](https://github.com/frnikho/)
