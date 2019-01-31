#!/bin/bash -e

if [[ -z "$1" ]]; then
    echo "Pass major/minor/patch as first argument"
    exit 1
fi

cd projects/ngx-bootstrap-validation
npm version $1
cd -
npm run build -- ngx-bootstrap-validation
cp README.md dist/ngx-bootstrap-validation/.
cd dist/ngx-bootstrap-validation
npm publish --access public