import { AxiosError } from "axios";
import { useEffect, useState } from "react"
import { MovieResponse, Movie } from '../../@types/theMovieDB';
import { movieDB } from "../api/movieDB"

class MoviesState {
    nowPlaying: Movie[] = [];
    popular: Movie[] = [];
    topRated: Movie[] = [];
    upcoming: Movie[] = [];
}

export const useMovies = () => {
    const [movieState, setMovieState] = useState<MoviesState>(new MoviesState());
    const [error, setError] = useState<AxiosError>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getMovies = async () => {
        try {
            const nowPlaying = movieDB.get<MovieResponse>('/now_playing');
            const popular = movieDB.get<MovieResponse>('/popular');
            const topRated = movieDB.get<MovieResponse>('/top_rated');
            const upcoming = movieDB.get<MovieResponse>('/upcoming');
            const promises = [nowPlaying, popular, topRated, upcoming];

            const res = await Promise.all(promises);

            setMovieState({
                nowPlaying: res[0].data.results,
                popular: res[1].data.results,
                topRated: res[2].data.results,
                upcoming: res[3].data.results,
            })

            setIsLoading(false);
        } catch (er) {
            setError(er)
        }
    }
    useEffect(() => {
        getMovies()
    }, [])

    return {
        movieState,
        ...movieState,
        error,
        isLoading
    }
}

