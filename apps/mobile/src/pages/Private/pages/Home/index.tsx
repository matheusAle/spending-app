import { SpendingForm } from '@/store';
import React, { useEffect, useRef } from 'react';
import { HomeRoutes } from './routes';
import {useDispatch, useSelector} from 'react-redux';
import SpendingCreate from './components/SpendingForm';
import { Animated, BackHandler, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

export default () => {

  const dispatch = useDispatch();
  const showForm  = useSelector(s => s.SpendingForm.show);
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    if (!modalizeRef.current) {
      return;
    }
    if (showForm) {
       modalizeRef.current.open();
    } else {
      modalizeRef.current.close();
    }
  }, [showForm]);

  return (
    <>
      <HomeRoutes />
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={true}
        withHandle={false}
        onClosed={() => dispatch(SpendingForm.show(false))}
      >
        <View style={{ padding: 16 }}>
          <SpendingCreate />
        </View>
      </Modalize>
    </>
  );
};
