import React, { useState, useEffect } from 'react';
import posed, { Transition } from "react-native-pose";
import { Container, Content } from './styles';
import {useDispatch, useSelector} from "react-redux";
import {TextField, ValidatorBuilder, Validators} from "@/components/inputs";
import { TouchableWithoutFeedback, ScrollView } from 'react-native';
import {SpendingForm} from "@/store";

export default ({ show }) => {

    const formState = useSelector(s => s.SpendingForm);
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    const Form = new ValidatorBuilder({
        name: [() => name, Validators.required],
    });

    return (
        <TouchableWithoutFeedback onPress={() => dispatch(SpendingForm.show(false))}>
            <Transition>
                {show && (<Container key="a">
                    <ScrollView>
                        <TouchableWithoutFeedback activeOpacity={1}>
                            <Content>
                                <TextField value={name}
                                           label="Nome: *"
                                           validator={Form.email}
                                           onChangeText={v => setName(v)} />

                            </Content>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </Container>)}
            </Transition>
        </TouchableWithoutFeedback>
    )
}
