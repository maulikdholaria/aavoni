#!/bin/sh
sudo su
yum install nginx
systemctl start nginx


yum install git


mkdir /usr/share/app
cd /usr/share/app

git clone git@github.com:maulikdholaria/aavoni.git

yum install npm
yum -y install python-devel mysql-devel
yum -y install gcc

#For nginx proxy to backend app at port 3001
setsebool httpd_can_network_connect on -P