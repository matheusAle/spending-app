import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { ActionButton, Icon as I, IconContainer } from './styles'
import Container from './Container';
import {useSelector} from "react-redux";
import { TouchableOpacity } from "react-native";

import posed from 'react-native-pose'



const IContainer = posed.View({
    visible: {
        borderRadius: 15,
        transition: { duration: 300 },
        paddingBottom: 5,
        paddingTop: 5,
    },
    hidden: {
        borderRadius: 0,
        transition: { duration: 150 },
        paddingBottom: 0,
        paddingTop: 0
    },
    passive: {
        backgroundColor: ['borderRadius', {
            inputRange: [0, 15],
            outputRange: ['rgb(255,255,255)', 'rgb(251,138,255)']
        }]
    }
});

const Icon = withNavigation(({ navigation, route, name, active = false }) => {

    const currentRouteState = useSelector(s => (s.App.nav || {}).currentScreen);
    const [isActive, setActive] = useState(active);

    const nav = () => {
        navigation.navigate(route)
    };

    useEffect(() => {
        setActive(currentRouteState === route ? true: currentRouteState === undefined ? active : false);
    }, [ currentRouteState ]);

    return (
        <TouchableOpacity onPress={nav}>
            <IContainer
                style={{ backgroundColor: "red" }}
                pose={isActive ? 'visible' : 'hidden' }>
                <I name={name}
                   type={'material'}
                   color={isActive ? 'white' : undefined}
                   size={24}/>
            </IContainer>
        </TouchableOpacity>
    )
});

export default withNavigation(({ navigation }) => {

    return (
        <Container>

            <IconContainer>
                <Icon name="home" route="SpendingList" active={true}/>
                <Icon name="search" route="Search"/>
            </IconContainer>

            <ActionButton/>

            <IconContainer>
                <Icon name="timeline" route="Reports"/>
                <Icon name="person" route="Settings"/>
            </IconContainer>

        </Container>
    )
});