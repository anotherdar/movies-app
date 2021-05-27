import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { MovieDetail, Cast, CastRes } from '../../@types/MovieDetail';
import { movieDB } from '../api/movieDB';

interface MovieDetails {
    isLoading: boolean;
    fullDetails?: MovieDetail;
    cast?: Cast[];
}

export const useMovieDetail = (id: number) => {
    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        cast: [],
        fullDetails: undefined
    });

    async function getMovie() {
        try {
            const currentMovieDetail = await movieDB.get<MovieDetail>(`/${id}`)
            const castDetail = await movieDB.get<CastRes>(`/${id}/credits`)

            const res = await Promise.all([currentMovieDetail, castDetail]);

            setState({
                isLoading: false,
                cast: res[1].data.cast,
                fullDetails: res[0].data 
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovie()
    }, [])

    return {
        ...state
    }
}