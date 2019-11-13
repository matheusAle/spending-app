import React from 'react';
import { Routes } from './routes'
import FetchWalletsContainer from './containers/FetchWalletsContainer';
import { deepRoute } from "@/utils";

export default deepRoute(Routes, ({ navigation }) => {

  return (
    <FetchWalletsContainer>
      <Routes navigation={navigation} />
    </FetchWalletsContainer>
  )
});
