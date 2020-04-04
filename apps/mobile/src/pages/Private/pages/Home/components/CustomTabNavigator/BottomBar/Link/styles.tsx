import React from 'react';
import styled from "styled-components/native";
import IconBase from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";

export const Icon = styled(IconBase) `
  margin: 0 auto;
  background-color: transparent;
  color: ${({ color }) => color || 'white'};
`;
