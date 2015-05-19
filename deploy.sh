#!/bin/sh
git submodule init
git submodule update
npm install
cd client
bower install
cd ..
