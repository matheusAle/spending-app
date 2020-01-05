import React from 'react';
import posed, { Transition } from "react-native-pose";
import { Container, Content } from './styles';
import {useDispatch, useSelector} from "react-redux";
import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {SpendingForm} from "@/store";
import { View, Text } from 'react-native'
export default ({ children }) => {

  const dispatch = useDispatch();
  const showForm  = useSelector(s => s.SpendingForm.show);

  return (
      <TouchableWithoutFeedback onPress={() => dispatch(SpendingForm.show(false))}>
        <Transition>
          {showForm && (
            <Container key="a">
              <ScrollView
                style={{
                  height: '100%',
                  flex: 1,
                }}
                contentContainerStyle={{
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  height: '100%',
                }}
              >
                <TouchableWithoutFeedback activeOpacity={1} style={{ flex: 1, height: '100%' }}>
                  <View>
                    <Content>
                      {children}
                    </Content>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </Container>
          )}
        </Transition>
      </TouchableWithoutFeedback>
  )
}
