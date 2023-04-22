import { describe, expect, test } from 'vitest';

import { TheOneApi } from './rest';

describe('TheOneApi', () => {
    test('It should instantiate', () => {
        const api = new TheOneApi('1234');
        expect(api).not.toBeUndefined();
    });

    /**
     * If I were to spend more time on this, I would mock the fetch call and/or inject
     * a fetch library so I could instrument the return and test all the success/error cases
     */
    test.skip('It should get some books', async () => {
        const api = new TheOneApi('');
        const result = await api.get('book');
        expect(result.docs.length).toEqual(3);
    });
});
