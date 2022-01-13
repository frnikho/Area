#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
WHITE='\033[0m'

echo -ne "STOP ALL CONTAINERS (yes or no) ? "
read input
yes=$(echo $input | tr -s '[:upper:]' '[:lower:]')
if [[  "$input" = "yes"  ]] ; then
    # STOP CONTAINERS
    echo -e "\n${BLUE}------------- STOP ALL CONTAINERS -------------${WHITE}\n"
    docker stop $(docker ps -a  -q)
    echo -e "\n${GREEN}------------- CONTAINERS ARE STOPED -------------${WHITE}\n"
else
    echo -e "\n${PURPLE}------------- CONTAINERS AREN'T STOPED -------------${WHITE}\n"
fi

echo -ne "DELETE ALL CONTAINERS (yes or no) ? "
read input
yes=$(echo $input | tr -s '[:upper:]' '[:lower:]')
if [[  "$input" = "yes"  ]] ; then
    # DELETE CONTAINERS
    echo -e "\n${BLUE}------------- DELETE ALL CONTAINERS -------------${WHITE}\n"
    docker rm $(docker ps -a  -q)
    echo -e "\n${GREEN}------------- CONTAINERS ARE DELETED -------------${WHITE}\n"
else
    echo -e "\n${PURPLE}------------- CONTAINERS AREN'T DELETED -------------${WHITE}\n"
fi


# DOCKER COMPOSE BUILD

echo -e "\n${BLUE}------------- DOCKER COMPOSE BUILD -------------${WHITE}\n"
docker-compose build
echo -e "\n${GREEN}------------- DOCKER COMPOSE BUILD DONE -------------${WHITE}\n"

# DOCKER COMPOSE UP
echo -ne "DOCKER COMPOSE UP PRINT DETAILS (yes or no) ? "
read input
yes=$(echo $input | tr -s '[:upper:]' '[:lower:]')
echo -e "\n${BLUE}------------- DOCKER COMPOSE UP -------------${WHITE}\n"
if [[  "$input" = "yes"  ]] ; then
    docker-compose up
else
    docker-compose up -d
fi
echo -e "\n${GREEN}------------- DOCKER COMPOSE DONE -------------${WHITE}\n"