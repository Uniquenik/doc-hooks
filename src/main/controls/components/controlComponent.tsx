import React from 'react';
import { createStyles, Grid } from '@mantine/core';

interface IControlLayoutProps {
  leftSide: JSX.Element;
  rightSide: JSX.Element;
}

export const ControlComponent: React.FC<IControlLayoutProps> = props => {
  const { leftSide, rightSide } = props;

  const { classes } = useStyles();

  //Render
  return (
    <Grid className={classes.controls} gutter={'md'} align={'center'}>
      <Grid.Col xs={3}>{leftSide}</Grid.Col>
      <Grid.Col xs={9}>{rightSide}</Grid.Col>
    </Grid>
  );
};

const useStyles = createStyles(theme => ({
  controls: {
    width: '100%',
  },
}));
