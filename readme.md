# cors anywhere with serverless

this project sets up a serverless proxy to handle cross-origin resource sharing (cors) requests using aws lambda and api gateway. it allows you to bypass cors restrictions by proxying requests to the target server.

## features

- supports get requests
- allows setting a timeout of up to 30 seconds for proxied requests
- supports returning responses in json format
- includes cors headers in responses

## prerequisites

- node.js (version 18.x)
- serverless framework
- aws account

## installation

1. clone the repository:
  ```bash
  git clone https://github.com/oeo/cors-anywhere-serverless.git
  cd cors-anywhere-serverless
  ```

2. install dependencies:
  ```bash
  npm install
  ```

## usage

### running locally

you can run the server locally using the `serverless-offline` plugin:

1. start the local server:
  ```bash
  serverless offline
  ```

2. test the local server:
  ```bash
  curl -X GET "http://localhost:3000/dev/?url=https%3A%2F%2Fwww.example.com"
  curl -X GET "http://localhost:3000/dev/?json=1&url=https%3A%2F%2Fwww.example.com"
  ```

### deploying to aws

1. deploy the service:
  ```bash
  serverless deploy
  ```

2. test the deployed service:
  ```bash
  curl -X GET "https://your-api-id.execute-api.your-region.amazonaws.com/dev/?url=https%3A%2F%2Fwww.example.com"
  curl -X GET "https://your-api-id.execute-api.your-region.amazonaws.com/dev/?json1=&url=https%3A%2F%2Fwww.example.com"
  ```

## license

this project is licensed under the mit license.

