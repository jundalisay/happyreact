import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Home from '../screens/Home';
import PlaySong from '../screens/PlaySong';

const AppNavigator = StackNavigator(
    {
        // Login: { screen: Login },
        Home: { screen: Home },
        PlaySong: { screen: PlaySong },
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#eee'
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/ic_arrow_left.png')} style={{ width: 30, height: 30, margin: 15 }}/>
                </TouchableOpacity>
            )
        })
    }
);

export default AppNavigator;
