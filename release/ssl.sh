#!/bin/sh

##https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/#auto-renewal
sudo su
sudo yum install python-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com