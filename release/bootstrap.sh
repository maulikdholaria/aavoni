#!/bin/sh
sudo su
yum install nginx
systemctl start nginx


yum install git


mkdir /usr/share/app
cd /usr/share/app

git clone git@github.com:maulikdholaria/aavoni.git

yum install npm
npm install webpack
npm install webpack-cli