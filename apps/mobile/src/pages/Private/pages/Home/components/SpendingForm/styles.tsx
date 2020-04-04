import styled from 'styled-components';
import posed from "react-native-pose";
import {Dimensions} from "react-native";
const din = Dimensions.get('window');

export const Container = posed(styled.View `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.35);
  flex-direction: column;
  align-content: stretch;
  justify-content: flex-end;
  display: flex;
`)({
    enter: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    }
});

export const Content = posed(styled.View `
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 20px;
  width: 100%;
  position: relative;
  margin-bottom: 0;
`)({
    enter: {
        opacity: 1,
        y: 0,
        delay: 200
    },
    exit: {
        opacity: 0,
        y: 100
    }
});

export const WalletItem = styled.Text `
  font-size: 20px;
  margin: 10px 5px;

`;
