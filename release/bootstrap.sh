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

## Upgrading node
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
rm -f /bin/node
ln -s /usr/local/bin/node /bin/node

#For nginx proxy to backend app at port 3001
setsebool httpd_can_network_connect on -P