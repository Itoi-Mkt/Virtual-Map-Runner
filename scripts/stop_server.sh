#!/bin/bash
print "stop_server \n"
sudo 'kill -KILL -s QUIT `cat /var/www/Virtual-Map-Walker/tmp/pids/unicorn.pid`'