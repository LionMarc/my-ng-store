#!/bin/sh

version=$1
packagesFolder=`realpath $2`
echo "Building version ${version} into ${packagesFolder}..."

npm run "build:store"
npm run "build:navigation"

for folder in dist/my-ng-store dist/mli/navigation
do
    cd ${folder}
    npm version ${version}
    npm pack --pack-destination ${packagesFolder}
    cd -
done
