import React, { useState } from 'react';
import { Input } from '@ui-kitten/components';
import { InputContainer } from './styles';

export const TextField = (props) => {
    const [validateMessage, setValidateMessage] = useState('');
    const [status, setStatus] = useState('');

    const onBlur = (...args) => {

        if (props.onBlur) props.onBlur(...args);

        if (props.validator) {
            props.validator.$validate();
        }
    };

    if (props.validator) {
        props.validator.$onValidate.push((result) => {
            if (result.length > 0) {
                setStatus('danger');
                setValidateMessage(result[0]);
            } else {
                setStatus('');
                setValidateMessage('');
            }
        })
    }

    return (
        <InputContainer>
            <Input
                {...props}
                onBlur={onBlur}
                status={status}
                caption={validateMessage}
                size="small"/>
        </InputContainer>
    )
};

export const PasswordField = (props) => {

    return (
        <TextField {...props} secureTextEntry={true}/>
    )
};

export * from './validator'
export * from './toggle/Toggle'
export * from './styles'
