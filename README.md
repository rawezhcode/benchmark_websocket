# benchmark_websocket

## Installation 
## Instal First ( k6 ) MacOS

```bash
brew install k6

```

## Instal First ( k6 ) Windows

```bash
winget install k6 --source winget

```

## Run Benchmark (Centrifugo)


```bash
 k6 run centrifugo.js   

```

## Run Benchmark (Pusher or (Laravel reverb) or (soketi))


```bash
 k6 run pusherWs.js   

```