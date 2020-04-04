import React from 'react';
import styled from "styled-components/native";
import { View } from "react-native";

export const Container = styled(View) `
  height: 68px;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 0;  
`;

export const LinkGroup = styled(View) `
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 35%;
`;
