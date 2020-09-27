import React from 'react';
import styled from 'styled-components';
// todo: migrate UI kitten
import { withStyles } from '@ui-kitten/components';

const style = (state) => props => props.eva.style[state][props.checked ? 'active' : 'default'];

export const WorldContainer = withStyles<{ checked: boolean }, any>(styled.View `
  border: 1px solid ${style('border')};
  border-radius: 50px;
  padding: 8px 16px;
  background-color: ${style('background')};
`, theme => ({
  border: {
    default: theme['border-basic-color-5'],
    active: theme['color-primary-500'],
  },
  background: {
    default: theme['background-basic-color-1'],
    active: theme['color-primary-active'],
  },
}));
