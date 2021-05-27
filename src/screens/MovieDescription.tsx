import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Image, Text, View, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from '../Navigation/AppNavigation';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { MovieDetail } from '../components/MovieDetails';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface RootParams extends RouteProp<RootStackParams, 'appMovie'> { }

const { height } = Dimensions.get('screen')

export const MovieScreen: React.FC = () => {
    const { params } = useRoute<RootParams>()
    const navigator = useNavigation()
    const { title, poster_path, original_title, id } = params;
    const uri = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const { isLoading, fullDetails, cast } = useMovieDetail(id);
    return (
        <ScrollView>

            <View
                style={styles.coverContainer}
            >
                <Image
                    source={{
                        uri
                    }}
                    style={styles.coverImage}
                />
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.subTitle}>{original_title}</Text>
                <Text style={styles.title}>{title}</Text>
            </View>
            {isLoading ? (
                <ActivityIndicator color='#ffaa00' size={35} style={{ marginTop: 5 }} />
            ) : (
                <MovieDetail movieDetail={fullDetails!} cast={cast!} />
            )}
            {/* close btn */}
            <View style={styles.close}>
                <TouchableOpacity onPress={() => navigator.goBack()}>
                    <Icon name='close-circle-outline' size={40} color='#fff' />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    coverImage: {
        flex: 1,
    },
    coverContainer: {
        height: height * 0.7,
        width: '100%',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 15,

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    detailContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    title: {
        fontSize: 20,
        color: '#121212',
        fontWeight: '600'
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.6
    },
    close: {
        position: 'absolute',
        zIndex: 999,
        elevation: 20,
        top: 15,
        left: 5,
    }
})