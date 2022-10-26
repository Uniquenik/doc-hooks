import React, { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from './errorScreen';
import { createStyles } from '@mantine/core';

export type ActiveStoryProps = {
  Story?: FC;
};

export const ActiveStory: FC<ActiveStoryProps> = props => {
  const { Story } = props;
  const { classes } = useStyles();

  //Renders
  return (
    <div className={classes.container}>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => <ErrorScreen error={error} tryAgain={resetErrorBoundary} />}
      >
        {Story && <Story />}
      </ErrorBoundary>
    </div>
  );
};

const useStyles = createStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
