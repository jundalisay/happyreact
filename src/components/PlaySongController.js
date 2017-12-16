import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

class PlaySongController extends React.PureComponent {

    state = {
        isPlay: false,
    }

    componentWillMount() {
        const listening = {
            song_id: '',
            user_id: ''
        }
        // fetch('http://happymusic.herokuapp.com/songs/2.json').then(res=>res.json())
        // .then(res => console.log(res))
    }

    playSong() {
        this.setState({ isPlay: true });
        this.props.play();

    }

    pauseSong = () => {
        this.setState({ isPlay: false });
        this.props.pause();
    }

    renderPlayBtn() {
        if (this.state.isPlay === true) {
            return (
                <TouchableOpacity onPress={() => this.pauseSong()} style={styles.pauseBtn}>
                    <Ionicons name="ios-pause" size={30} color="black" />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => this.playSong()} style={styles.playBtn}>
                    <Ionicons name="ios-play" size={30} color="white" />
                </TouchableOpacity>
            );
        }
    }

    render() {
        const { isPlay } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {}} style={styles.nextBtn}>
                    <SimpleLineIcons name="arrow-left" size={15} color="black" />
                </TouchableOpacity>
                {
                    this.renderPlayBtn()
                }
                <TouchableOpacity onPress={() => {}}style={styles.nextBtn}>
                    <SimpleLineIcons name="arrow-right" size={15} color="black" />
                </TouchableOpacity>
                {/* <View style={styles.playBtn}>
                    <Ionicons name="ios-play" size={30} color="white" />
                </View> */}
                {/* <Text>PlaySongController</Text> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        marginBottom: 50
        // backgroundColor: '#2c3e50',
    },
    playBtn: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        // padding: 20,
        borderWidth: 1,
        borderRadius: 40,
    },
    pauseBtn: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // padding: 20,
        borderWidth: 1,
        borderRadius: 40,
    },
    nextBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 15,
    }
});

export default PlaySongController;
