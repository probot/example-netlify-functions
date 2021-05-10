# Probot & Netlify Functions example

This repository is an example of how to deploy the "Hello, World" of probot apps to [Netlify Functions](https://www.netlify.com/products/functions/).

## Local setup

Install dependencies

```
npm install
```

Start the server

```
npm start
```

Follow the instructions to register a new GitHub app.

## Run the netlify function locally

You need to run `npm start` at least once in order to register a new GitHub App for your local testing. It will create a `.env` file with your app's credentials once it's done.

Install the [Netlify Dev CLI](https://www.netlify.com/products/dev/)

```
npm install --global netlify-cli
```

Then start it the root folder of this repository

```
netlify dev
```

In a new terminal app, start [`smee-client`](https://github.com/probot/smee-client/#readme) in order to receive webhook event requests from GitHub

```
npx smee --url [WEBHOOK_PROXY_URL] --target http://127.0.0.1:8888/.netlify/functions/webhooks
```

Replace `WEBHOOK_PROXY_URL` with the value of `WEBHOOK_PROXY_URL` in your `.env` file.

## Deployment

_tbd_

## License

[ISC](LICENSE)
