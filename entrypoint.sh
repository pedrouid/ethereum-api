#!/bin/bash

SOLAR_NETWORK_URL=${SOLAR_NETWORK_URL:-https://test-sct.netwarps.com}

# replace the frented params
sed -i "s|https://test-sct.netwarps.com/|${SOLAR_NETWORK_URL}|g" /dist/chains.js

# run 
exec node /dist/index.js
