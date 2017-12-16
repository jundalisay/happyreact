import React from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Home extends React.PureComponent {
    static navigationOptions = {
        title: 'My Music',
        headerStyle: {
            position: 'absolute', left: 0, top: 0, right: 0,backgroundColor: 'rgba(255,255,255,0.8)'
        }
    }
    state = {
        songs: []
    }

    componentWillMount() {
        fetch('https://happymusic.herokuapp.com/songs.json')
            .then(res => res.json())
            .then(res => {
                if (res.songs) this.setState({ songs: res.songs });
            }).catch(() => alert('Get songs failed!'));
    }


    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('PlaySong', { song: item})} >
                <ImageBackground source={{ uri: item.photo }} style={styles.itemContainer} >
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', position: 'absolute', bottom: 0, left: 0, top: 0, right: 0 }} />
                    <View style={{ flex: 1, flexDirection: 'row',  }}>
                        {/* <Ionicons name="ios-musical-notes" size={18} color="black" /> */}
                        <View style={{ flex:1, paddingVertical: 5,marginLeft: 30, paddingLeft: 50, marginBottom: 10, backgroundColor: 'rgba(255,255,255,0.7)' }}>
                            <Text style={styles.songTitle}>{item.title}</Text>
                            <Text style={styles.songArtists}>{item.artist.name}</Text>
                        </View>
                        <Image source={{ uri: item.artist.photo }} style={{ width: 60, height: 60, borderRadius: 30, position: 'absolute', bottom: 5, left: 5 }} />
                        
                    </View>

                </ImageBackground>
            </TouchableOpacity>
        );
    }

    render() {
        const { songs } = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ paddingTop: 80 }}
                    data={songs}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    numColumns={1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee',
    },
    itemContainer: {
        height: 120,
        flexDirection: 'row',
        padding: 0,
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#BDBDBD',
        alignItems: 'flex-end',
        backgroundColor: '#000',
        borderRadius: 5,
        marginVertical: 5,
        // opacity: 0.8,
    },
    songTitle: {
        fontSize: 16
    },
    songArtists: {
        fontSize: 14
    }
});

export default Home;
