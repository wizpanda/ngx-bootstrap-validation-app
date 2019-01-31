#!/bin/bash -e

echo "1"
npm run build -- ngx-bootstrap-validation
echo "2"
cp README.md dist/ngx-bootstrap-validation/.
cd dist/ngx-bootstrap-validation
echo "3"
npm publish --access public