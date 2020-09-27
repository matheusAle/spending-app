import React from 'react';
import * as eva from '@eva-design/eva';
import { Provider as ReduxProvider } from 'react-redux';
import { ApplicationProvider as KittenProvider} from '@ui-kitten/components';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '@/services/client';
import Loading from '@/components/loader';
import { NavigationContainer } from '@react-navigation/native';
import store from './store';
import AppPages from './pages';

export default () => {

  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <KittenProvider {...eva} theme={eva.dark}>
          <>
            <NavigationContainer>
              <AppPages />
            </NavigationContainer>
            <Loading />
          </>
        </KittenProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
};
