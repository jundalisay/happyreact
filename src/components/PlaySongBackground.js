import React from 'react';
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';
import { Svg } from 'expo';

class PlaySongBackground extends React.PureComponent {

    state = {
        isAnimated: false,
        spinValue: new Animated.Value(0)
    }
    componentDidMount() {
        this.animated();
    }
    playSong() {
        this.state.isAnimated = true;
        this.animated();
    }
    stopSong() {
        this.state.isAnimated = false;
    }

    animated() {
        Animated.sequence([
            Animated.timing(this.state.spinValue, { toValue: 1, duration: 10000, easing: Easing.linear }),
            Animated.timing(this.state.spinValue, { toValue: 0, duration: 0, easing: Easing.linear })
        ]).start(() => {
            if (this.state.isAnimated) {
                this.animated();
            }
        });
    }

    componentWillUnmount() {
        this.state.isAnimated = false;
    }

    render() {
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={styles.container}>
                <View>
                    <Svg height="300" width="300">
                        <Svg.Defs>
                            <Svg.RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
                                <Svg.Stop
                                    offset="0%"
                                    stopColor="#ff0"
                                    stopOpacity="1"
                                />
                                <Svg.Stop
                                    offset="100%"
                                    stopColor="#eee"
                                    stopOpacity="1"
                                />
                            </Svg.RadialGradient>
                        </Svg.Defs>
                        <Svg.Ellipse cx="150" cy="150" rx="150" ry="150" fill="url(#grad)" />
                    </Svg>
                    <Animated.Image style={[styles.image, { transform: [{ rotate: spin }] }]} source={{ uri: this.props.song.artist.photo }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    image: {
        width: 240,
        height: 240,
        borderRadius: 120,
        position: 'absolute', top: 10, left: 30,
    }
});

export default PlaySongBackground;
