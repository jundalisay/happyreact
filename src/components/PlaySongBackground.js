import React from 'react';
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';

class PlaySongBackground extends React.PureComponent {

    state = {
        isAnimated: true,
        spinValue: new Animated.Value(0)
    }

    componentWillMount() {
        this.animated();
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
                <Animated.Image style={[styles.image, { transform: [{ rotate: spin }] }]} source={{ uri: this.props.song.artist.photo }} />
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
        width: 300,
        height: 300,
        borderRadius: 150
    }
});

export default PlaySongBackground;
