import React, { useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { Animated, View } from 'react-native';
import {useSelector, useStore} from "react-redux";
import {subscribe, unsubscribe} from 'redux-subscribe'

class Loader extends  React.Component {

    state = {
        rotate: new Animated.Value(0),
        opacity: new Animated.Value(0),
        spin: '0deg'
    };

    componentDidMount() {
        Animated.loop(Animated.timing(this.state.rotate, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }
        )).start();

        Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start();

        let spin = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        this.setState({ spin })
    }
    render() {
        return (
            <Animated.View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                opacity: this.state.opacity,
                backgroundColor: 'rgba(61, 61, 61, .7)',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Animated.View style={{
                    transformOrigin: '50% 50%',
                    transform: [{ rotate: this.state.spin }],
                    width: 100,
                    height: 100
                }}>
                    <Svg height="100%" width="100%" viewBox="0 0 100 100">
                        <Circle cx="50" cy="50"
                                fill="none"
                                strokeLinecap="round" r="40" stroke-width="6" stroke="white"
                                strokeDasharray="62.83185307179586 62.83185307179586"
                                transform="rotate(127.365 50 50)">

                        </Circle>
                    </Svg>
                </Animated.View>
            </Animated.View>

        )
    }
}

export default () => {
    const loading = useSelector(s => s.App.loading);

    return (
        <>
            { loading && <Loader /> }
        </>
    )
}




