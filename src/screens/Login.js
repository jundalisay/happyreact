import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDof07xJTf8q9QYFHIec0H94ylnFeLn6C8",
    authDomain: "happymusic-cfbdd.firebaseapp.com",
    databaseURL: "https://happymusic-cfbdd.firebaseio.com",
    projectId: "happymusic-cfbdd",
    storageBucket: "happymusic-cfbdd.appspot.com",
    messagingSenderId: "260161531545"
};

firebase.initializeApp(firebaseConfig);

class Login extends React.PureComponent {
    static navigationOptions = {
        header: null
    }

    state = {
        email: 'jundal@live.com',
        password: '123123'
    }

    loginFirebase = () => {
        const { email, password } = this.state;


    //     fetch(
    //         'https://happymusic.herokuapp.com/login',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ session: { email, password }})
    //         }
    //     ).then(resp => resp.json()).then(res => {
    //         console.log(res)
    //     }).catch(err => console.log(err));
    //     // this.goHome();
    // }

    // async onLoginPressed() {
    //     try {
    //         let response = await fetch('https://happymusic.herokuapp.com/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 session: {
    //                     email: 'jundal@live.com',
    //                     password: '123123'
    //                 }
    //             })
    //         });
    //         let res = await response.text();
    //         if (response.status >= 200 && response.status < 300) {
    //             //Handle success
    //             let accessToken = res;
    //             console.log(accessToken);
    //             //On success we will store the access_token in the AsyncStorage
    //             //this.storeToken(accessToken);
    //             this.goHome();
    //         } else {
    //             //Handle error
    //             let error = res;
    //             throw error;
    //         }
    //     } catch (error) {

    //         console.log("error " + error);

    //     }

        firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            this.goHome();
        }).catch(error => {
            console.log(error);
        });

    }

    goHome() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        })
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100, marginBottom: 60 }}/>

                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.state.email = text.trim()}
                    underlineColorAndroid={'transparent'}
                    placeholder={'Email'}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.state.password = text.trim()}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry
                    placeholder={'Password'}
                />

                <TouchableOpacity onPress={this.loginFirebase} style={{ width: 250, padding: 10, backgroundColor: '#000', borderRadius: 20, alignItems: 'center', marginTop: 40 }}>
                    <Text style={{ color: '#fff' }}>Login</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    textInput: {
        width: 250,
        paddingVertical: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        marginVertical: 15,
    }
});

export default Login;
