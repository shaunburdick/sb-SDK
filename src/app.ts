import dotenv from 'dotenv';

import { APIParams, TheOneApi } from './lib/rest';
import { LotRMovie } from './movie/movie';

// Load .env files into Environment
dotenv.config();

// Export classes/interfaces for consumption
export { APIParams, TheOneApi } from './lib/rest';
export { LotRMovie } from './movie/movie';

/**
 * The One SDK!
 * This SDK allows you to interact easily with https://the-one-api.dev/
 *
 * @export
 * @class TheOneSDK
 */
export class TheOneSDK {
    /**
     * An instance of the the One API helper class
     * @private
     */
    private api: TheOneApi;

    /**
     * Creates an instance of TheOneSDK.
     * @param [apiKey] An API key to access some endpoints that require authorization
     *                 If not provided, it will try to read it from the environment as TOA_KEY
     * @param [base] The base URL of the API, in case you deploy your own
     */
    constructor(private apiKey?: string, private base?: string) {
        if (!apiKey) {
            this.apiKey = process.env.TOA_KEY;
        }

        this.api = new TheOneApi(this.apiKey || '', this.base);
    }

    /**
     * Fetch information about the LotR Movies
     *
     * @param [params] Any search parameters
     * @return an array of LotRMovie instances
     */
    async movies(params?: APIParams): Promise<LotRMovie[]> {
        return LotRMovie.search(this.api, params);
    }

    /**
     * Fetch information about a specific LotR Movie, by ID
     *
     * @param id The ID of the movie
     * @return an instance of LotRMovie
     */
    async movie(id: string): Promise<LotRMovie> {
        const movie = new LotRMovie(id, this.api);
        return movie.load();
    }
}
