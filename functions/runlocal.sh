#!/bin/bash
sudo fuser -k 8080/tcp
sudo fuser -k 8081/tcp
yarn prepare
firebase serve --only functions --host 0.0.0.0 --port 8080