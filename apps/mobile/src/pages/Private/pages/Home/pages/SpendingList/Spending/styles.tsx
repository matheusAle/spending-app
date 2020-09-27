import { Card } from '@ui-kitten/components';
import styled from 'styled-components/native';

export const Container = styled(Card) `
  margin: 7px 14px;
`;

export const Title = styled.Text `
  font-size: 20px;
  line-height: 30px;
`;

export const Date = styled.Text `
  font-size: 12px;
  line-height: 12px;
  opacity: .6;
`;

export const Details = styled.View `
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
