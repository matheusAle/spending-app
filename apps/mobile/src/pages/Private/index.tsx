import { Layout } from '@ui-kitten/components';
import React from 'react';
import { PrivateRoutes } from './routes'
import FetchWalletsContainer from './containers/FetchWalletsContainer';

export default () => {

  return (
    <FetchWalletsContainer>
      <PrivateRoutes />
    </FetchWalletsContainer>
  )
};
