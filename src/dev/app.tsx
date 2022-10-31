import React from 'react';
import { ReactDocHooks } from '../main';
import { ButtonStory } from './stories/ButtonStory';
import { InputStory, InputStoryMarkdown } from './stories/InputStory';
import { createStories } from '../main/stories';

import ButtonMD from './stories/ButtonMarkdown.md';

const stories = createStories([
  { name: 'Кнопка', component: ButtonStory, markdownFile: ButtonMD },
  { name: 'Инпут', component: InputStory, markdownString: InputStoryMarkdown },
]);

export const App = () => (
  <>
    <ReactDocHooks stories={stories} />
  </>
);
