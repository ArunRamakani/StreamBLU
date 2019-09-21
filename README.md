# StreamBLU
Stream Data Business Logic Unit



kubectl apply -f https://raw.githubusercontent.com/ArunRamakani/StreamBLU/master/mysql-pv.yaml

kubectl apply -f https://raw.githubusercontent.com/ArunRamakani/StreamBLU/master/mysql.yaml

kubectl run -it --rm --image=mysql:5.6 --restart=Never mysql-client -- mysql -h mysql -ppassword

create database user;

CREATE TABLE user.usr ( id INT(6) UNSIGNED , name VARCHAR(30) NOT NULL, message VARCHAR(30) NOT NULL);






