# Installation

you need to do all configurations sections before, see [Services.md](SERVICES.md)


```shell
$ git clone git@github.com:EpitechPromo2024/B-YEP-500-NAN-5-1-yearendproject-victor.sauvaget.git
$ cd B-YEP-500-NAN-5-1-yearendproject-victor.sauvaget
```

## Docker

```shell
$ sudo docker-compose up --build
```

## Manual


Create the sslCredentials folder and generate the SSL Certificates:
```shell

root/server:

$ mkdir sslCredentials
$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout sslCredentials/sslKey.key -out sslCredentials/sslCertificate.crt
$ sudo chown -c nico -R sslCredentials/
```
