import { Text } from '@ui-kitten/components';
import styled from 'styled-components/native'

// Fix for line-height fit to text size https://github.com/facebook/react-native/issues/7687#issuecomment-220886890
const textSize = size => `
  font-size: ${size}px;
  line-height: ${(size * .75)}px;
  padding-top: ${size - (size * .75)}px;
`;

export const CostContainer = styled.View `
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Currency = styled(Text) `
  align-self: flex-end;  
  padding-bottom: 5px;
  ${textSize(10)}
`;

export const Value = styled(Text)  `
  ${textSize(35)}
`;

export const Decimal = styled(Text)  `
  align-self: flex-start;
  margin-left: 3px;
  ${textSize(13)}
`;
