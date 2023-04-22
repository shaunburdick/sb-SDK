/**
 * A data representation of a LotR Movie
 *
 * @export
 * @interface LotRMovieData
 */
export interface LotRMovieData {
    /**
     * A collection unique identifier
     */
    _id: string;

    /**
     * The name of the movie
     */
    name: string;

    /**
     * The runtime of the movie, in minutes
     */
    runtimeInMinutes: number;

    /**
     * The budget of the movie, in millions (of dollars?)
     */
    budgetInMillions: number;

    /**
     * The box office revenue, in millions (of dollars?)
     */
    boxOfficeRevenueInMillions: number;

    /**
     * The number of award nominations from the Academy of Motion Picture Arts and Sciences
     * @see https://www.oscars.org/oscars
     */
    academyAwardNominations: number;

    /**
     * The number of award wins from the Academy of Motion Picture Arts and Sciences
     * @see https://www.oscars.org/oscars
     */
    academyAwardWins: number;

    /**
     * The score awarded to the movie from Rotten Tomatoes
     * @see https://www.rottentomatoes.com/about
     */
    rottenTomatoesScore: number;
}
