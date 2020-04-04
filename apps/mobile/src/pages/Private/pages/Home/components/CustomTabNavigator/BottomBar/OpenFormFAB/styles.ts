import { View, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import IconBase from "react-native-vector-icons/MaterialIcons";

export const Container = styled(TouchableWithoutFeedback) `

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

export const ActionButtonIcon = styled(IconBase) `
  color: white;
`;
