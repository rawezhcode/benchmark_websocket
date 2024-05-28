# benchmark_websocket

## Installation

## Instal First ( k6 ) MacOS

```bash
brew install k6

```

## Instal ( dotenv-cli )

```bash
npm install -g dotenv-cli

```

## Instal First ( k6 ) Windows

```bash
winget install k6 --source winget

```

## Config .env

```bash
CENTRIFUGO_HMAC_SECRET='token_hmac_secret_key'
CENTRIFUGO_URL='wss://localhost:8000/connection/websocket'

PUSHER_URL='wss://localhost'

```

## Run Benchmark (Centrifugo)

```bash
dotenv -e .env k6 run centrifugo.js

```

## Run Benchmark (Pusher or (Laravel reverb) or (soketi))

```bash
dotenv -e .env k6 run pusherWs.js

```
# benchmark_websocket
