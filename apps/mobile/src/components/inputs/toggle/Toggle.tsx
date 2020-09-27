import {Text, Toggle as ToggleBase} from '@ui-kitten/components';
import React from 'react';
import { InputContainerInline } from '../styles';
import { TouchableWithoutFeedback } from 'react-native';

export const Toggle = (props) => {

    return (
        <TouchableWithoutFeedback onPress={() => props.checked = !props.checked}>
            <InputContainerInline>
                <ToggleBase {...props} />
                <Text style={{ marginLeft: 10 }}>
                    { props.label }
                </Text>
            </InputContainerInline>
        </TouchableWithoutFeedback>
    );
};
