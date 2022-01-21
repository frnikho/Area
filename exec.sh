read -p "Kill all port ? (yes / no)" port
if [ "$port" = "yes" ]
then
    echo "\e[3mkill port [3000, 3306, 8080]\e[0m"
    sudo kill -9 "$(sudo lsof -t -i:3000)" 2>/dev/null
    sudo kill -9 "$(sudo lsof -t -i:3306)" 2>/dev/null
    sudo kill -9 "$(sudo lsof -t -i:8080)" 2>/dev/null
fi

read -p "Stop and delete all container ? (yes / no)" stop
if [ "$stop" = "yes" ]
then
    echo "\e[3mStop and delete all container\e[0m"
    docker rm -f "$(docker ps -a -q)"
fi

echo "\e[3mExec docker-compose\e[0m"
docker-compose up --build
