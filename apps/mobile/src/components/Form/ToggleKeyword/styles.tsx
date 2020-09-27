import React from 'react';
import styled from 'styled-components';
import { ThemedComponentClass, withStyles } from 'react-native-ui-kitten';

export const WorldContainer = withStyles<{ checked: boolean }, any>(styled.View `
  border: 1px solid ${p => p.themedStyle.border[p.checked ? 'active' : 'default']};
  border-radius: 50px;
  padding: 10px 15px;
`, theme => ({
  border: {
    default: theme['color-basic-500'],
    active: theme['color-primary-500'],
  },
}));
