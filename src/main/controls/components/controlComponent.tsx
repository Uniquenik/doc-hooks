import React from 'react';
import { Grid } from '@mantine/core';

interface IControlLayoutProps {
  leftSide: JSX.Element;
  rightSide: JSX.Element;
}

export const ControlComponent: React.FC<IControlLayoutProps> = props => {
  const { leftSide, rightSide } = props;

  //Render
  return (
    <Grid sx={{width: '100%'}} gutter={'md'} align={'center'}>
      <Grid.Col xs={3}>{leftSide}</Grid.Col>
      <Grid.Col xs={9}>{rightSide}</Grid.Col>
    </Grid>
  );
};
