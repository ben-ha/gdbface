echo Building...

if [ ! -d dist ]; then
mkdir dist
fi

webpack
cp web/index.html dist/
