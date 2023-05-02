import { describe, expect, test } from 'vitest';

import { TheOneSDK } from './app';

describe('TheOneSDK', () => {
    test('It should instantiate', () => {
        const sdk = new TheOneSDK('1234');
        expect(sdk).not.toBeUndefined();
    });

    /**
     * If I were to spend more time on this, I would create a mock API instance
     * so I could instrument the return and test all the success/error cases
     * without actually hitting the API
     *
     * For now I will use live data (so it requires a valid API key to test)
     */
    if (process.env.TOA_KEY) {
        test('It should get a list of movies', async () => {
            const sdk = new TheOneSDK();
            const movies = await sdk.movies();
            expect(movies.length).toEqual(8);
        });

        test('It should get a fully hydrated movie', async () => {
            const sdk = new TheOneSDK();
            const movie = await sdk.movie('5cd95395de30eff6ebccde5c'); // The Fellowship of the Ring
            expect(movie.data).not.toBeUndefined();
        });

        test('It should throw an error if it cannot find the movie by id', async () => {
            const id = 'not-a-real-id';
            const sdk = new TheOneSDK();
            await expect(sdk.movie(id)).rejects.toThrowError(`Unable to find movie with id: ${id}`);
        });
    }
});
