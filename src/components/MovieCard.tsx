import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../../@types/theMovieDB';

interface Props {
    movie: Movie,
    width?: number,
    height?: number
}

export const MovieCard: React.FC<Props> = ({ movie, width = 300, height = 420}) => {
    const { poster_path } = movie
    const uri = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const navigator = useNavigation();

    return (
        <TouchableOpacity 
            style={{
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 7
            }}
            activeOpacity={0.9}
            onPress={() => navigator.navigate('appMovie', movie)}
        >
            <View style={styles.coverContainer}>
                <Image
                    source={{
                        uri
                    }}
                    style={styles.cover}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cover: {
        flex: 1,
        borderRadius: 18,

    },
    coverContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#121212",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 7,

        elevation: 10,
    }
})