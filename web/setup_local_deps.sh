#!/bin/bash

set -e

yarn=tyarn

echo "Setting up wcdocker..."
pushd ./pgadmin/static/vendor/wcdocker
$yarn unlink &>/dev/null || true
$yarn link
popd

$yarn link "webcabin-docker"
$yarn install
