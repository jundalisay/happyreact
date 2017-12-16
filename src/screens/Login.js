import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

class Login extends React.PureComponent {
    static navigationOptions = {
        header: null
    }

    state = {
        email: 'jundal@live.com',
        password: '123123'
    }

    onLogin = () => {
        const { email, password } = this.state;
        fetch(
            'https://happymusic.herokuapp.com/login',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session: { email: 'jundal@live.com', password: '123123' }})
            }
        ).then(resp => resp.json()).then(res => {
            console.log(res)
        }).catch(err => console.log(err));
        // this.goHome();
    }

    async onLoginPressed() {
        try {
            let response = await fetch('https://happymusic.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session: {
                        email: 'jundal@live.com',
                        password: '123123'
                    }
                })
            });
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
                //Handle success
                let accessToken = res;
                console.log(accessToken);
                //On success we will store the access_token in the AsyncStorage
                //this.storeToken(accessToken);
                this.goHome();
            } else {
                //Handle error
                let error = res;
                throw error;
            }
        } catch (error) {

            console.log("error " + error);

        }
    }

    goHome() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100, marginBottom: 60 }}/>
                {/* <Text style={{ width: 250, fontSize: 20, marginBottom: 10 }}>Login</Text> */}
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
                <TouchableOpacity onPress={this.onLoginPressed} style={{ width: 250, padding: 10, backgroundColor: '#000', borderRadius: 20, alignItems: 'center', marginTop: 40 }}>
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
