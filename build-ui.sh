#!/bin/sh
rm -rf ./src/Backend/src/Authoring.UI/UI/
yarn --cwd ./src/Frontend
yarn --cwd ./src/Frontend build
cp -R ./src/Frontend/build ./src/Backend/src/Authoring.UI/UI
touch ./src/Backend/src/Authoring.UI/UI/.keep
