import React from 'react';
import { View, Text, PanResponder, StyleSheet } from 'react-native';

class ProgressBar extends React.PureComponent {
    state = {
        progress: 0,
    }

    componentWillMount() {
        console.log('gestureState');
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                // console.log(gestureState);
                return true;
            },
            onPanResponderEnd: (e, gestureState) => {
                console.log(gestureState);
                return true;
            }
        })
    }

    setValue(progress) {
        // this.Progress.setNativeProps({ style: { flex: progress } });
    }

    render() {
        const { progress } = this.state;
        const { size = 2, style } = this.props;
        return (
            <View
                style={[styles.container, style]}
            >
                <View {...this._panResponder.panHandlers} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                {/* <View ref={c => this.Progress = c} style={[styles.progress, { flex: progress, height: size }]} />
                <View style={[styles.remains, { flex: 1 - progress, height: size }]} /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'red',
    },
    progress: {
        backgroundColor: '#009688',
    },
    remains: {
        height: 2,
        backgroundColor: '#BDBDBD',
    }
});

export default ProgressBar;
