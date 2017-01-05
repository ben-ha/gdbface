#!/bin/bash

echo Building...
webpack
cp ./web/index.html ./dist/
echo Done

if [ -n $1 ]; then
    ./gdbface.js
fi

