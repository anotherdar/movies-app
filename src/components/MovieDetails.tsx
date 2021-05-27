import * as React from 'react';
import { Text, View, StyleSheet,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Cast, MovieDetail as Details } from '../../@types/MovieDetail';
import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem';
type Props = {
    movieDetail: Details,
    cast: Cast[]
}

export const MovieDetail: React.FC<Props> = ({ movieDetail, cast }) => {
    return (
        <View style={{marginHorizontal: 20, marginBottom: 20}}>
            <View style={styles.detail}>
                <Icon size={24} name='star-outline' color='#ffaa00'/>
                <Text style={{marginLeft: 5}}>{movieDetail.vote_average}</Text>
                <Text style={{marginHorizontal: 5}}>- { movieDetail.genres.map(g => g.name).join(', ')}</Text>
            </View>
            <View style={{marginTop: 10}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Over view</Text>
                <Text>{movieDetail.overview}</Text>
            </View>

            <View style={{marginTop: 10}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Budget</Text>
                <Text>{currencyFormatter.format(movieDetail.budget, {code: 'USD'})}</Text>
            </View>
            <View style={{marginTop: 10}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Casting</Text>
        
                {/* <CastItem actor={cast[0]}/> */}
                <FlatList 
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <CastItem actor={item}/>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detail: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})