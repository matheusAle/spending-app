import styled from 'styled-components';
import posed from "react-native-pose";

export const Container = posed(styled.View `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.35);
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
  height: 100%;
  margin-top: 50%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 20px;
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
