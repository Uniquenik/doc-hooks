import React from 'react';
import { ReactDocHooks } from '../main';
import { InputStory } from './stories/InputStory';
import { ButtonStory } from './stories/ButtonStory';

const stories = {
  ButtonStory,
  InputStory,
};

export const App = () => (
  <>
    <ReactDocHooks stories={stories} />
  </>
);
