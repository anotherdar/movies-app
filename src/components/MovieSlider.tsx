import * as React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Movie } from '../../@types/theMovieDB';
import { MovieCard } from './MovieCard';

interface Props {
    movies: Movie[],
    title?: string
}

export const MovieSlider: React.FC<Props> = ({ movies, title }) => {
    return (
        <View style={{
            height: ( title) ? 260 : 210,
            marginHorizontal: 10,
        }}>
            {title && <Text style={styles.listTitle}>{title}</Text>}
            <FlatList
                data={movies}
                renderItem={(item) => {
                    return <MovieCard movie={item.item} width={140} height={200} />
                }}
                keyExtractor={(movie) => movie.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10
    }
})