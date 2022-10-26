import React, { FC, useCallback, useMemo, useState } from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineThemeOverride } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from './layout/components/errorScreen';
import { StoryWindow } from './layout/storyWindow';
import { ControlsContext, ControlsContextType } from './context';
import { useCreateSubject } from './context/useSubject';
import { Control } from './controlHooks';

interface IReactDocHooksProps<T> {
  stories: T;
  theme?: MantineThemeOverride;
}

export const ReactDocHooks = <T extends Record<string, FC>>(props: IReactDocHooksProps<T>) => {
  const { theme, stories } = props;

  //Change theme (dark/light)
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  //Initialize controls
  const [controls, setControls] = useCreateSubject<Record<string, Control>>({});

  //Errors inside story components
  const withBoundaryStories = useMemo(() => {
    const result: Record<string, FC> = {};
    Object.entries(stories).forEach(([key, Story]) => {
      result[key] = () => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorScreen error={error} tryAgain={resetErrorBoundary} storyKey={key} />
          )}
        >
          <Story />
        </ErrorBoundary>
      );
    });
    return result;
  }, []);

  //Handlers
  const updateControl: ControlsContextType['updateControl'] = useCallback((id, partial) => {
    setControls(prev => ({ ...prev, [id]: { ...prev[id], ...partial } }));
  }, []);

  const createControl: ControlsContextType['createControl'] = useCallback((id, control) => {
    setControls(prev => ({ ...prev, [id]: control }));
  }, []);

  const deleteControl: ControlsContextType['deleteControl'] = useCallback(id => {
    setControls(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, []);

  //Render
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ ...theme, colorScheme }} withGlobalStyles withNormalizeCSS>
        <ControlsContext.Provider value={{ createControl, deleteControl, controls, updateControl }}>
          <StoryWindow stories={withBoundaryStories} />
        </ControlsContext.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
