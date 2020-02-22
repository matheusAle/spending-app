import React from "react";
import {List, ListItem} from "react-native-ui-kitten";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableNativeFeedback }  from 'react-native';

export const ListFactory = ({
                                pageTitle,
                                list: {
                                    source: listSource = [],
                                    onPress: listItemPress = (props, item) => {},
                                },
                                header = {},
                            }) => {

    let _props;
    return Object.defineProperties((props) => {
        _props = props;

        return (
            <List
                data={listSource}
                renderItem={({ item }) => {
                    return (
                        <ListItem
                            title={`${item.label}`}
                            onPress={(i) => listItemPress(props, item)}
                            titleStyle={{
                                fontSize: 16,
                                marginVertical: 5
                            }}
                        />
                    )
                }}
            />
        )
    }, {
        navigationOptions: {
            value: {
                title: pageTitle,
                headerRight: header && header.right !== false ? (
                    <TouchableNativeFeedback onPress={() => header.right && header.right.onPress && header.right.onPress(_props)}
                                             background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                        <View style={{ padding: 16, borderRadius: 50 }}>
                            <Icon name="add" color="black" size={24} />
                        </View>
                    </TouchableNativeFeedback>
                ) : undefined
            }
        }
    });
};

