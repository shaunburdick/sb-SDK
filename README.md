# The One SDK

This SDK provides an easy interface to interact with data from [The One API](https://the-one-api.dev/)

-   [Install](#install)
-   [Authentication](#authentication)
-   [Usage](#usage)
-   [Testing](#testing)
-   [Contributing](#contributing)

## Install

To install, add the SDK to your project using NPM (or your other favorite Node package manager):

```bash
npm install --save @shaunburdick/sb-SDK
```

## Authentication

Some endpoints of The One API require authentication via an API Key.

You can sign up for an API Key: https://the-one-api.dev/sign-up

Once you have your API Key, you can provide it a few different ways:

-   via Environment using the key `TOA_KEY`
-   via ENV file, by adding `TOA_KEY=your-api-key` to your local `.env` file
-   via instantiation, when creating your instance of the SDK: `const sdk = new TheOneSDK('your-api-key')'`

## Usage

```ts
import { TheOneSDK } from '@shaunburdick/sb-SDK';

// using environment
const sdk = new TheOneSDK();

// using API key directly
// const sdk = new TheOneSDK('your-api-key');

// get a list of movies
const movies = await sdk.movies();

// get a movie by id
const movie = await sdk.movie('5cd95395de30eff6ebccde5c'); // The Fellowship of the Ring

// get quotes from a movie
const quotes = await movie.quote();

// get only 10 quotes from a movie
const tenQuotes = await movie.quote({ limit: 10 });
```

## Documentation

The project implements TSDoc comments to make documentation easier to generate.

To generate documentation, run `npm run generate-docs`

You can then view the documentation in [./docs](./docs/index.html)

## Testing

Run the following commands to execute various tests:

-   `npm t` will run all tests
-   `npm run test:unit` will run all unit tests
-   `npm run test:watch` to watch for changes and rerun the tests
-   `npm run test:coverage` to run the tests and generate a coverage report. Found in `./coverage`
-   `npm run test:lint` to check the project for linting errors
-   `npm run test:format` to check the project for formatting errors

## Contributing

1. Fork this repository.
2. Add failing tests for the change you want to make (if applicable). Run `npm t` to see the tests fail.
3. Fix test (implement your feature).
4. Run `npm t` to see if the tests pass. Repeat steps 2-4 until done.
5. Update the documentation to reflect any changes.
6. Push to your fork and submit a pull request.
