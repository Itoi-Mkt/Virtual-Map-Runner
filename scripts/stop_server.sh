#!/bin/bash
su -l deploy -c 'kill -KILL -s QUIT `cat /var/www/Virtual-Map-Walker/tmp/pids/unicorn.pid`'