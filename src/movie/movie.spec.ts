import { describe, expect, test } from 'vitest';

import { TheOneApi } from '../lib/rest';
import { LotRMovie } from './movie';

describe('LotRMovie', () => {
    test('It should instantiate', () => {
        const api = new TheOneApi('1234');
        const movie = new LotRMovie('1234', api);
        expect(movie).not.toBeUndefined();
    });

    /**
     * If I were to spend more time on this, I would create a mock API instance
     * so I could instrument the return and test all the success/error cases
     */
    if (process.env.TOA_KEY) {
        test('It should hydrate itself', async () => {
            const api = new TheOneApi(process.env.TOA_KEY as string);
            const movie = new LotRMovie('5cd95395de30eff6ebccde5c', api); // The Fellowship of the Ring
            await movie.load();
            expect(movie.data).not.toBeUndefined();
        });
    }

    // Insert tests for the other endpoints here
});
