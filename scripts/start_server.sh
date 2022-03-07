#!/bin/bash
sudo cd /var/www/Virtual-Map-Walker && bundle exec unicorn_rails -c config/unicorn.rb -p 3000 -E development -D