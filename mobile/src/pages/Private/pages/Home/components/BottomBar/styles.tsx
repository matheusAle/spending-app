import React from 'react';
import styled from "styled-components/native";
import IconBase from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";

export const Icon = styled(IconBase) `
  margin: 0 auto;
  background-color: transparent;
  color: ${({ color }) => color || 'white'};
`;

export const Container = styled(View) `
  height: 68px;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 0;  
`;


export const ActionButtonIcon = styled(IconBase) `
  color: white;
`;

export const ActionButton = styled(View) `
  background-color: #B543B9;
  height: 68px;
  width: 68px;
  position: absolute;
  top: -43px;
  left: 50%;
  transform: translateX(-34px);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkGroup = styled(View) `
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 35%;
`;
