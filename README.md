# ethereum-api

Ethereum Blockchain API Aggregator

## API

### Get Account Assets
Required Params: address, chainId

```bash
GET https://ethereum-api.xyz/account-assets?address=0xfeBD6abD30D8E1AD477957C376efb79d1758B8c1&chainId=1

# Response
{
    "success": true,
    "result": [
        {
            "symbol": "ETH",
            "name": "Ethereum",
            "decimals": "18",
            "contractAddress": "",
            "balance": "0"
        },
        {
            "symbol": "BKC",
            "name": "Bankcoin Cash",
            "decimals": "8",
            "contractAddress": "0xc88be04c809856b75e3dfe19eb4dcf0a3b15317a",
            "balance": "158552014464"
        }
    ]
}
```

### Get Account Transactions
Required Params: address, chainId

```bash
GET https://ethereum-api.xyz/account-transactions?address=0xfeBD6abD30D8E1AD477957C376efb79d1758B8c1&chainId=1

# Response
{
    "success": true,
    "result": [
        {
            "timestamp": "1549654458000",
            "hash": "0x837991f0f72fb1acc63b386dbbd59957a9034476af20264378507d627a9e6569",
            "from": "0xfebd6abd30d8e1ad477957c376efb79d1758b8c1",
            "to": "0x8b17190217491094d09d7c8ca5ef683ac251c900",
            "nonce": "3",
            "gasPrice": "1000000000",
            "gasUsed": "21000",
            "fee": "21000000000000",
            "value": "720919600000000",
            "input": "0x",
            "error": false,
            "asset": {
                "symbol": "ETH",
                "name": "Ethereum",
                "decimals": "18",
                "contractAddress": ""
            },
            "operations": []
        },
        {
            "timestamp": "1548329044000",
            "hash": "0xf24978e7502e97342a679b7a5d1fe9b41a56d497f4ed17293ba64b4c4bbce757",
            "from": "0xfebd6abd30d8e1ad477957c376efb79d1758b8c1",
            "to": "0xc88be04c809856b75e3dfe19eb4dcf0a3b15317a",
            "nonce": "2",
            "gasPrice": "1500000000",
            "gasUsed": "24178",
            "fee": "36267000000000",
            "value": "0",
            "input": "0xa9059cbb0000000000000000000000008b17190217491094d09d7c8ca5ef683ac251c900000000000000000000000000000000000000000000000055f3831b1ab52a0000",
            "error": true,
            "asset": {
                "symbol": "ETH",
                "name": "Ethereum",
                "decimals": "18",
                "contractAddress": ""
            },
            "operations": []
        },
        {
            "timestamp": "1540938002000",
            "hash": "0xd9c6e897a164ac0947ba5b005a80f4dbd9cf61544d61ac2d8481c61d60c2d7a0",
            "from": "0xfebd6abd30d8e1ad477957c376efb79d1758b8c1",
            "to": "0xc88be04c809856b75e3dfe19eb4dcf0a3b15317a",
            "nonce": "1",
            "gasPrice": "1200000000",
            "gasUsed": "24178",
            "fee": "29013600000000",
            "value": "0",
            "input": "0xa9059cbb0000000000000000000000008b17190217491094d09d7c8ca5ef683ac251c900000000000000000000000000000000000000000000000055f3831b1ab52a0000",
            "error": true,
            "asset": {
                "symbol": "ETH",
                "name": "Ethereum",
                "decimals": "18",
                "contractAddress": ""
            },
            "operations": []
        },
        {
            "timestamp": "1540675507000",
            "hash": "0xad42e20f783e4c5a6407e9fea9a0ac26aebc76e45a04d9bb68886b3fe2dd0e1d",
            "from": "0xfebd6abd30d8e1ad477957c376efb79d1758b8c1",
            "to": "0xc88be04c809856b75e3dfe19eb4dcf0a3b15317a",
            "nonce": "0",
            "gasPrice": "2300000000",
            "gasUsed": "83826",
            "fee": "192799800000000",
            "value": "0",
            "input": "0x",
            "error": false,
            "asset": {
                "symbol": "ETH",
                "name": "Ethereum",
                "decimals": "18",
                "contractAddress": ""
            },
            "operations": [
                {
                    "asset": {
                        "symbol": "BKC",
                        "name": "Bankcoin Cash",
                        "decimals": "8",
                        "contractAddress": "0xc88be04c809856b75e3dfe19eb4dcf0a3b15317a"
                    },
                    "value": "158552014464",
                    "from": "0x0000000000000000000000000000000000000000",
                    "to": "0xfebd6abd30d8e1ad477957c376efb79d1758b8c1",
                    "functionName": "0x"
                }
            ]
        },
        {
            "timestamp": "1538926843000",
            "hash": "0xe8ab634b5e03491b938c011346fa4f2ac37ca64dceb37b5b362b30cf5b6676f1",
            "from": "0xc2b082e2efe9abab6f042d15beb46380b1952398",
            "to": "0xfebd6abd30d8e1ad477957c376efb79d1758b8c1",
            "nonce": "5809",
            "gasPrice": "2500000000",
            "gasUsed": "21000",
            "fee": "52500000000000",
            "value": "1000000000000000",
            "input": "0x",
            "error": false,
            "asset": {
                "symbol": "ETH",
                "name": "Ethereum",
                "decimals": "18",
                "contractAddress": ""
            },
            "operations": []
        }
    ]
}
```

### Get Account Nonce
Required Params: address, chainId

```bash
GET https://ethereum-api.xyz/account-nonce?address=0xfeBD6abD30D8E1AD477957C376efb79d1758B8c1&chainId=1

# Response
{
    "success": true,
    "result": "4"
}
```
