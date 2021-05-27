import * as React from 'react';
import { ActivityIndicator, Dimensions, Text, View, FlatList, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageColors from 'react-native-image-colors';

import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard';
import { Movie } from '../../@types/theMovieDB';
import { MovieSlider } from '../components/MovieSlider';
import { GradientContainer } from '../components/GradiendContainer';
import { color } from 'react-native-reanimated';
import { getColors } from '../helpers/getColors';
import { GradientContext } from '../Context/GradienContex';

const { width } = Dimensions.get('screen');

export const HomeScreen: React.FC = () => {
    const { isLoading, nowPlaying, popular, topRated, upcoming } = useMovies()
    const { top } = useSafeAreaInsets();
    const { setMainColors } = React.useContext(GradientContext);

    const getCoverColors = async(i: number) => {
        const uri = `https://image.tmdb.org/t/p/w500${nowPlaying[i].poster_path}`;
        const [ primary, secondary ] = await getColors( uri );

        setMainColors({ primary, secondary })
    }
    React.useEffect(() => {
        if(nowPlaying.length > 0) {
            getCoverColors(0)
        }
    }, [nowPlaying]);
    
    if (isLoading) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color='#ffaa00' size={70} />
        </View>
    )
    return (
        <GradientContainer>
            <ScrollView>

                <View style={{ top: top + 20 }}>
                    {/* carousel now playing */}
                    <View style={{ height: 460 }}>
                        <Carousel
                            data={nowPlaying}
                            renderItem={(movie: { item: Movie }) => <MovieCard movie={movie.item} />}
                            itemWidth={300}
                            sliderWidth={width}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={getCoverColors}
                        />
                    </View>
                    {/* Carousel popular */}
                    <MovieSlider movies={popular} title='Popular' />
                    {/* Carousel top rated */}
                    <MovieSlider movies={topRated} title='Top rated' />
                    {/* Carousel upcoming */}
                    <MovieSlider movies={upcoming} title='Upcoming' />

                </View>
            </ScrollView>
        </GradientContainer>
    )
}