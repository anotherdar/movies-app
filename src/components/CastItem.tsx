import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Cast } from '../../@types/MovieDetail';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    actor: Cast
}

export const CastItem: React.FC<Props> = ({ actor }) => {
    const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

    return (
        <View style={styles.actorContainer}>
            {actor.profile_path ? <Image 
                source={{
                    uri
                }}
                style={styles.img}
            /> : <Icon name='alert-circle-outline' size={50} color='#ffaa00'/>}
            <View style={styles.details}>
                <Text style={styles.title}>{actor.name}</Text>
                <Text style={styles.subTitle}>{actor.character}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.7
    },
    actorContainer: {
        overflow: 'hidden',
        borderRadius: 5,
        flexDirection: 'row',
        marginVertical: 10
    },
    img: {
        width: 50,
        height: 50,
    },
    details: {
        paddingHorizontal: 10,
    }
})