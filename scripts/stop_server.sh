#!/bin/bash
su kill -KILL -s QUIT `cat /var/www/Virtual-Map-Walker/tmp/pids/unicorn.pid`