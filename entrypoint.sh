#!/bin/sh

# replace the frented params

if [ ! -z "${SOLAR_NETWORK_URL}" ];then
    sed -i "s|https://test-sct.netwarps.com/|${SOLAR_NETWORK_URL}|g" dist/chains.js
fi

if [ ! -z "${SOLAR_BLOCKSCOUT_URL}" ];then
    sed -i "s|https://blockscout.com/|${SOLAR_BLOCKSCOUT_URL}|g" dist/blockscout.js
fi

# run 
exec node dist/index.js
