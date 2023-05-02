import fetch from 'node-fetch';

/**
 * API Parameters for paging, sorting, and filtering
 *
 * @export
 * @interface APIParams
 */
export interface APIParams {
    /**
     * The maximum number of documents to return
     */
    limit?: number;

    /**
     * Which page to return
     */
    page?: number;

    /**
     * How many documents to skip
     */
    offset?: number;

    /**
     * Sort the documents by field, in ascending or descending direction
     */
    sort?: {
        field: string;
        direction: 'asc' | 'desc';
    };
    // filtering
}

/**
 * The One response
 */
export interface APIResponse<DOC = unknown> {
    /**
     * A list of documents from the collection
     */
    docs: DOC[];

    /**
     * The number of documents in the collection
     */
    total: number;

    /**
     * The maximum number of documents to return
     */
    limit: number;

    /**
     * How many documents to skip
     */
    offset: number;

    /**
     * Which page to return
     */
    page: number;

    /**
     * The total number of pages
     */
    pages: number;
}

/**
 * A basic class to interact with the One API
 *
 * @export
 * @class TheOneApi
 */
export class TheOneApi {
    /**
     * Creates an instance of TheOneApi.
     *
     * @param apiKey The API key to access authenticated endpoints. @see https://the-one-api.dev/sign-up
     * @param [base='https://the-one-api.dev/v2']
     */
    public constructor(
        private apiKey: string,
        private base: string = 'https://the-one-api.dev/v2',
    ) {}

    /**
     * Fetch some documents from the API
     *
     * @template DOC The type of document you expect to be returned
     * @param path The path/slug to access
     * @param [params] Any additional parameters to filter the response
     * @return A promise that resolves with the API response
     */
    public async get<DOC>(path: string, params?: APIParams): Promise<APIResponse<DOC>> {
        const headers = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Accept: 'application/json',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${this.apiKey}`,
        };
        const url = new URL(`${this.base}/${path}`);
        if (params) {
            url.search = this.buildSearchParams(params).toString();
        }

        const result = await fetch(url, {
            headers,
        });

        try {
            const resultJson = await result.json();
            // It would be wise to put some document validation here
            // but for now I will do the unwise thing and assume
            return resultJson as APIResponse<DOC>;
        } catch (err) {
            // The API doesn't thrown a JSON based error, just some text
            // So the common error would be "SyntaxError: Unexpected token T in JSON at position 0"
            // which is not helpful, so let's enhance the error a bit
            throw new Error(`Unable to parse endpoint. Error: ${await result.text()}`);
        }
    }

    /**
     * Convert APIParams to a URLSearchParam object to be added to the URL
     *
     * @private
     * @param params Any additional parameters to filter the response
     * @return The Query Params for the API
     */
    private buildSearchParams(params: APIParams): URLSearchParams {
        const result = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            switch (key) {
                /**
                 * `sort` is a more complicated case, requiring merging field and direction
                 *
                 * @see https://the-one-api.dev/documentation
                 */
                case 'sort':
                    // eslint-disable-next-line security/detect-object-injection
                    result.append(key, `${value.field}:${value.direction}`);
                    break;
                default:
                    // eslint-disable-next-line security/detect-object-injection
                    result.append(key, value);
            }
        }

        return result;
    }
}
