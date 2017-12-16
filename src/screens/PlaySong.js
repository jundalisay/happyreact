import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo';
import PlaySongBackground from '../components/PlaySongBackground';
import PlaySongController from '../components/PlaySongController';
import ProgressBar from '../components/ProgressBar';

const soundObject = new Audio.Sound();

class PlaySong extends React.PureComponent {
    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        soundObject.setOnPlaybackStatusUpdate(this.playbackStatus)
        const source = { uri: 'https://zmp3-mp3-s1.zadn.vn/82e12c74f830116e4821/7171863683796474869?authen=exp=1513457543~acl=/82e12c74f830116e4821/*~hmac=ff8f085a0e3f85420b0a17a71efd3a4d' };
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
