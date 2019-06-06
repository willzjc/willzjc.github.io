#!/usr/bin/env bash

for url in $(cat run_list_input_bash); do
 echo -e "url: $url"
 python run_web_scraper.py $url
 sleep 20
done