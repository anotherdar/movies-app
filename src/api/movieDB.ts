import axios from 'axios'

export const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '333a6dcf59b9c3660ec3f16864e41da9',
        language: 'en-EN'
    }
})
