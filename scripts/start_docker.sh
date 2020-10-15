#!/usr/bin/env bash

image_name="FBMessenger-nodejs-boilerplate"

function build_test {
    docker-compose up --build test
}

function run_test {
    docker-compose up test
}

function build_dev {    
    docker-compose up --build dev
}

function run_dev {
     docker-compose up dev
}

function build_staging {    
    docker-compose down     
    docker-compose up -d --build staging
    docker ps
}

function run_staging {
     docker-compose down     
     docker-compose up -d staging
     docker ps
}

function remove_container {
    container="$1"
    docker-compose rm $container
}

cmd=$1
subcmd=$2
if [ -z "$cmd" ]; then
    echo "
Availble Commands        
        - test                      To run project tests
        - dev                       To run project on development settings
        - staging                   To run project on staging settings
        - cmd [container_name]      To open a bash terminal to the specified container
        - rm [container_name]       To remove a specific container
        - prune                     Cleaning Unused Docker Resources
        * append --build to any command in order to build the image before running it
        (e.g) dev --build, test --build
    "
else        
    if [ "$cmd" = "test" ]; then    
        if [ "$subcmd" = "--build" ]; then
            build_test
        else
            run_test
        fi        
    elif [ "$cmd" = "dev" ]; then    
        if [ "$subcmd" = "--build" ]; then
            build_dev
        else
            run_dev
        fi                        
    elif [ "$cmd" = "staging" ]; then    
        if [ "$subcmd" = "--build" ]; then
            build_staging
        else
            run_staging
        fi        
    elif [ "$cmd" = "list" ]; then    
        docker ps
    elif [ "$cmd" = "prune" ]; then            
        docker system prune      
    elif [ "$cmd" = "rm" ]; then    
        if [ "$subcmd" = "dev" ]; then
            remove_container dev
        elif [ "$subcmd" = "staging" ]; then
            remove_container staging
        elif [ "$subcmd" = "test" ]; then
            remove_container test
        else
            echo '
You did not specify which container you want to remove?!        
            '
        fi          
    elif [ "$cmd" = "cmd" ]; then    
        if [ -z "$subcmd" ]; then
            echo "
You didn't specify the container you want to run (e.g ./CLI/docker.sh cmd dev)
    "   
    elif [ "$subcmd" = "staging" ]; then 
            echo "
I am assuming that you are on staging enviroment and you have the docker service already runing hence won't auto start/stop in order not to mess up the enviroment!!!            
            "
            docker exec -it "${image_name}_${subcmd}_1" bash        
        else
            docker-compose up -d "$subcmd" 
            docker exec -it "${image_name}_${subcmd}_1" bash
            docker-compose down
        fi        
    fi
    
fi