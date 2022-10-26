import React from 'react';
import { MainScreen } from '../main';
import { InputStory } from './stories/InputStory';
import { ButtonStory } from './stories/ButtonStory';

const stories = {
  ButtonStory,
  InputStory,
};

export const App = () => (
  <>
    <MainScreen stories={stories} />
  </>
);
