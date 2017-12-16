import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo';
import PlaySongBackground from '../components/PlaySongBackground';
import PlaySongController from '../components/PlaySongController';
import ProgressBar from '../components/ProgressBar';

const soundObject = new Audio.Sound();

class PlaySong extends React.PureComponent {
    static navigationOptions = {
        title: 'Playing'
    }

    async componentDidMount() {
        soundObject.setOnPlaybackStatusUpdate(this.playbackStatus)
        const source = { uri: 'https://zmp3-mp3-s1.zadn.vn/8d9f98f64cb2a5ecfca3/4273050090907806359?authen=exp=1513485157~acl=/8d9f98f64cb2a5ecfca3/*~hmac=76a7c7d4a53bc98507632a625b772bbd' };
        await soundObject.loadAsync(source, {}, false);
        // this.playSong()

        // this.getSearchImageAPI('viet nam', 10).then(res => {
        //     console.log(res)
        // })
    }

    playbackStatus = (playbackStatus) => {
        // const { positionMillis, durationMillis } = playbackStatus;
        // this.ProgressBar.setValue(positionMillis / durationMillis);
    }

    getSearchImageAPI(query, startPage) {
        const obj = {
            q: query.replace(/\s/g, '+'),
            searchType: 'image',
            cx: '013595413220881155138:ckdd1ettlge',
            key: 'AIzaSyAfnHk3YGRigurol7ZnFeWmxMAhKQNPubc',
            start: startPage * 10
        };
        let param = '?' + Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a }, []).join('&');
        var url = 'https://www.googleapis.com/customsearch/v1' + param;
        return fetch(url).then((res) => res.json());
    }

    async playSong() {
        try {
            await soundObject.playAsync();
        } catch (error) {
            console.log('error', error)
        }
    }

    async pauseSong() {
        try {
            await soundObject.pauseAsync();
        } catch (error) {
            console.log('error', error)
        }
    }

    async componentWillUnmount() {
        try {
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
        } catch (error) {
            console.log('error', error)
        }
    }

    render() {
        const { song } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <PlaySongBackground song={song} />
                {/* <ProgressBar ref={c => this.ProgressBar = c} /> */}
                <PlaySongController play={this.playSong} pause={this.pauseSong} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
    },
});

export default PlaySong;
