import type { APIParams, TheOneApi } from '../lib/rest';
import type { LotRQuote } from '../models/quote';
import type { LotRMovieData } from './movie.model';

/**
 * This class represents a LotR movie.
 * It provides the movie's data as well as helper functions to fetch related data
 *
 * @export
 * @class LotRMovie
 */
export class LotRMovie {
    /**
     * Helper values for the API slugs needed to fetch data
     */
    public static slug = {
        movie: 'movie',
        quote: 'quote',
    };

    /**
     * The Raw movie data, as provided by the API
     */
    public data?: LotRMovieData;

    /**
     * The collection unique identification of the movie
     */
    public id: string;

    /**
     * Creates an instance of LotRMovie.
     *
     * @param content Either the movie id (for later hydration) or the full data object
     * @param api an instance of the One API
     */
    public constructor(content: string | LotRMovieData, private api: TheOneApi) {
        if (typeof content === 'string') {
            this.id = content;
        } else {
            this.data = content;
            this.id = content._id;
        }
    }

    /**
     * Search an instance of the API, with given parameters
     *
     * @static
     * @param api An instance of the One API
     * @param [params] Any search parameters
     * @return Fully hydrated instances of LotRMovie classes
     */
    public static async search(api: TheOneApi, params?: APIParams): Promise<LotRMovie[]> {
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
    public static async searchRaw(api: TheOneApi, params?: APIParams): Promise<LotRMovieData[]> {
        const result = await api.get<LotRMovieData>(`${LotRMovie.slug.movie}`, params);
        if (!result || !result.docs) {
            throw new Error(`Unable to find movies with params: ${params}`);
        }

        return result.docs;
    }

    /**
     * Fetch quotes from this specific movie
     *
     * @param params Any search parameters for the quotes
     * @return an array of raw quote data
     */
    public async quote(params: APIParams): Promise<LotRQuote[]> {
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
    public async load(): Promise<LotRMovie> {
        const result = await this.api.get<LotRMovieData>(`${LotRMovie.slug.movie}/${this.id}`);
        if (!result || !result.docs) {
            throw new Error(`Unable to find movie with id: ${this.id}`);
        }

        this.data = result.docs[0];

        return this;
    }

    public toString(): string {
        return JSON.stringify(this.data);
    }
}
