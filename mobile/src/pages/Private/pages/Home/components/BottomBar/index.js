import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { ActionButton, Icon, LinkGroup, ActionButtonIcon } from './styles'
import Container from './Container';
import {useDispatch, useSelector} from "react-redux";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { SpendingForm } from "@/store";
import posed from 'react-native-pose'


const IconContainer = posed.View({
    visible: {
        borderRadius: 50,
        transition: { duration: 300 },
    },
    hidden: {
        borderRadius: 0,
        transition: { duration: 150 },
    },
    passive: {
        backgroundColor: ['borderRadius', {
            inputRange: [0, 15],
            outputRange: ['transparent', 'white']
        }]
    }
});

const Link = withNavigation(({ navigation, route, icon, active = false }) => {

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
            <IconContainer
                style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48
                }}
                pose={isActive ? 'visible' : 'hidden' }>
                <Icon name={icon}
                   type={'material'}
                   color={isActive ? '#6100ED' : undefined}
                   size={24}/>
            </IconContainer>
        </TouchableOpacity>
    )
});

export default withNavigation(({ navigation }) => {

    const d = useDispatch();

    return (
        <Container>

            <LinkGroup>
                <Link icon="home" route="SpendingList" active={true}/>
                <Link icon="search" route="Search"/>
            </LinkGroup>

            <TouchableWithoutFeedback onPress={() => d(SpendingForm.show(true))}>
                <ActionButton>
                    <ActionButtonIcon name="add" size={48} type={'material'}/>
                </ActionButton>
            </TouchableWithoutFeedback>

            <LinkGroup>
                <Link icon="timeline" route="Reports"/>
                <Link icon="person" route="User"/>
            </LinkGroup>

        </Container>
    )
});
