import { APIParams, TheOneApi } from '../lib/rest';
import { LotRQuote } from '../models/quote';
import { LotRMovieData } from './movie.model';

/**
 * This class represents a LotR movie.
 * It provides the movie's data as well as helper functions to fetch related data
 *
 * @export
 * @class LotRMovie
 */
export class LotRMovie {
    /**
     * The Raw movie data, as provided by the API
     */
    data?: LotRMovieData;

    /**
     * The collection unique identification of the movie
     */
    id: string;

    /**
     * Helper values for the API slugs needed to fetch data
     */
    static slug = {
        movie: 'movie',
        quote: 'quote',
    };

    /**
     * Search an instance of the API, with given parameters
     *
     * @static
     * @param api An instance of the One API
     * @param [params] Any search parameters
     * @return Fully hydrated instances of LotRMovie classes
     */
    static async search(api: TheOneApi, params?: APIParams): Promise<LotRMovie[]> {
        const result = await LotRMovie.searchRaw(api, params);

        return result.map(doc => new LotRMovie(doc, api));
    }

    /**
     * Search an instance of the API, with given parameters
     *
     * @static
     * @param api An instance of the One API
     * @param [params] Any search parameters
     * @return The raw movie data from the API
     */
    static async searchRaw(api: TheOneApi, params?: APIParams): Promise<LotRMovieData[]> {
        const result = await api.get<LotRMovieData>(`${LotRMovie.slug.movie}`, params);
        if (!result || !result.docs) {
            throw new Error(`Unable to find movies with params: ${params}`);
        }

        return result.docs;
    }

    /**
     * Creates an instance of LotRMovie.
     * @param content Either the movie id (for later hydration) or the full data object
     * @param api an instance of the One API
     */
    constructor(content: string | LotRMovieData, private api: TheOneApi) {
        if (typeof content === 'string') {
            this.id = content;
        } else {
            this.data = content;
            this.id = content._id;
        }
    }

    /**
     * Fetch quotes from this specific movie
     *
     * @param params Any search parameters for the quotes
     * @return an array of raw quote data
     */
    async quote(params: APIParams): Promise<LotRQuote[]> {
        const result = await this.api.get<LotRQuote>(
            `${LotRMovie.slug.movie}/${this.id}/${LotRMovie.slug.quote}`,
            params,
        );

        return result.docs;
    }

    /**
     * Hydrate this object with data about the movie from the One API
     *
     * @return itself, hydrated
     */
    async load(): Promise<LotRMovie> {
        const result = await this.api.get<LotRMovieData>(`${LotRMovie.slug.movie}/${this.id}`);
        if (!result || !result.docs) {
            throw new Error(`Unable to find movie with id: ${this.id}`);
        }

        this.data = result.docs[0];

        return this;
    }

    toString(): string {
        return JSON.stringify(this.data);
    }
}
