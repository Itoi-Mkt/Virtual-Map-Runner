#!/bin/bash
print "bundle_install \n"
sudo -l deploy -c 'cd /var/www/Virtual-Map-Walker && bundle install --path vendor/bundle'