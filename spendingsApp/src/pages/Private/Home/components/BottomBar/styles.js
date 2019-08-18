import styled from "styled-components/native";
import IconBase from "react-native-vector-icons/MaterialIcons";
import {View} from "react-native";

export const Icon = styled(IconBase) `
  margin: 0 15px;
  color: ${({ color }) => color || '#434343'};
`;

export const Container = styled(View) `
  height: 68px;
  width: 100%;
  position: relative;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const ActionButton = styled(View) `
  background-color: #DA08EA;
  height: 68px;
  width: 68px;
  position: absolute;
  top: -43px;
  left: 50%;
  transform: translateX(-34px);
  border-radius: 100px;
`;

export const IconContainer = styled(View) `
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 35%;
`;