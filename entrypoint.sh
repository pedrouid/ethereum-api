#!/bin/bash

# replace the frented params

if [ ! -z "${SOLAR_NETWORK_URL}" ];then
    sed -i "s|https://test-sct.netwarps.com/|${SOLAR_NETWORK_URL}|g" dist/chains.js
fi

# run 
exec node dist/index.js
