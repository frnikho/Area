# Action REAction

## About

### Auth:

native auth:
- email (required)
- firstname (optional)
- lastname (optional)
- password (required)

IMPORTANT !
every user using native auth must verifiy their adresse email

third parts login:
- google ?
- github ?

## Technologies

all parts use MVC

Frontend and mobile: maybe react native ?

- libs (react-mui?)

Backend: nodejs with typescript ?

- libs (express, body-parser, cors, nodemailer, jsonwebtoken, mariadb, dotenv)

Front: react tsc -> Théo
Mobile: react native tsc -> Justin
Server: nodejs tsc-> Victor & Nico
BDD: mariadb

Passe partout: Clement ?

## Docker

services:

bdd: mariadb
- port: 3306

server: nodejs
- port: 8080

client_web:
- port: 8081

client_mobile:
 job: build the apk and put it into the build directory



## Database schema:

| *table name* | uuid | email | password | firstname | lastname | auth_type | verified |
|--|--|--|--|--|--|--|--|--|--|--|
| users | varchar(255) [primary key] | varchar(255) [not null] | varchar(255) | varchar(255) | varchar(255) | enum {native, google?, github?} [not null] | boolean [not null]




## Services

*REQUIRED: 6 Services & 15 Action, Reaction*

Github
Gmail
Discord
Slack
Google Calendar
Telegram ?
Intra Epitech




Action (If):

Github:
- push
- open pull request
- close pull request
- add new release

Gmail:
- receive a email

Google calendar
- add an event
- event

Google drive
- file / directory upload

Discord
- receive a message (tag?)

Reaction:

Gmail:
- send a email

Slack
- send a message
- send a private message

Discord
- send a private message
- send a channel message

Spotify:
- change current song
- change play state

Telegram
- send a message
