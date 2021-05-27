import * as React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContext } from '../Context/GradienContex';
import { useFade } from '../hooks/useFade';

export const GradientContainer: React.FC = ({ children }) => {
    const { colors, prevColors, setPrevMainColors} = React.useContext(GradientContext);
    const { opacity, fadeIn, fadeOut} = useFade()

    React.useEffect(() => {
        fadeIn(() => {
            setPrevMainColors(colors)
            fadeOut(0)
        })
    }, [colors])
    return (
        <View style={{ flex: 1 }} >
            <LinearGradient
                colors={[prevColors.primary, prevColors.secondary, '#fff']}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{
                    x: 0.1, y: 0.1
                }}
                end={{
                    x: 0.8, y: 0.8
                }}
            />

            <Animated.View
                style={{ ...StyleSheet.absoluteFillObject, opacity }}
            >
                <LinearGradient
                    colors={[colors.primary, colors.secondary, '#fff']}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    start={{
                        x: 0.1, y: 0.1
                    }}
                    end={{
                        x: 0.8, y: 0.8
                    }}
                />
            </Animated.View>
            {children}
        </View>
    )
}