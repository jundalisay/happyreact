import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Home extends React.PureComponent {
    static navigationOptions = {
        title: 'My Music'
    }
    state = {
        songs: []
    }

    componentWillMount() {
        fetch('https://happymusic.herokuapp.com/songs.json')
            .then(res => res.json())
            .then(res => {
                if (res.songs) {
                    this.setState({ songs: res.songs });
                }

            })
    }


    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('PlaySong', { song: item})} style={styles.itemContainer}>
                <Ionicons name="ios-musical-notes" size={18} color="black" />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.songTitle}>{item.title}</Text>
                    <Text style={styles.songArtists}>{item.artist.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { songs } = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    data={songs}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
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
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#BDBDBD',
        alignItems: 'center'
        // backgroundColor: '#fff',
        //borderRadius: 5,
        // marginVertical: 5,
    },
    songTitle: {
        fontSize: 16
    },
    songArtists: {
        fontSize: 14
    }
});

export default Home;
