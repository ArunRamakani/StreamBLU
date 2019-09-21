# StreamBLU

Stream Data Business Logic Unit. 


## Create MYSQL for Business Logic Unit

kubectl apply -f https://raw.githubusercontent.com/ArunRamakani/StreamBLU/master/mysql-pvc.yaml

kubectl apply -f https://raw.githubusercontent.com/ArunRamakani/StreamBLU/master/mysql.yaml

## Connect to MYSQL and Create Database/Table

kubectl run -it --rm --image=mysql:5.6 --restart=Never mysql-client -- mysql -h mysql -ppassword

create database user;

CREATE TABLE user.usr ( id INT(6) UNSIGNED , name VARCHAR(30) NOT NULL, message VARCHAR(30) NOT NULL);

## Deploy to Kubernetes

To deploy the application in kubernetes use

kubectl apply -f https://raw.githubusercontent.com/ArunRamakani/StreamServer/master/streamblu.yaml



## Build

checkout the repository and run the below command to build the docker image in your local

docker build -t arunramakani/stream-blu

Alternatively we can pull the docker image from the Docker Hub directly using the below command

docker pull arunramakani/stream-blu

## Run

Once you have the image you can run the image using the command

docker run -e MY_SQL=mysql arunramakani/stream-blu

This make the server start looking for any new gRPC connections. See datastreamblu.proto file in this repository for gRPC contarct details. For the service to run we need mysql setup up and running.






