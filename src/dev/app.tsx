import React from 'react';
import { ReactDocHooks, ReactDocHooksOptions } from '../main';
import { ButtonStory } from './stories/ButtonStory';
import { InputStory, InputStoryMarkdown } from './stories/InputStory';
import { createStories } from '../main';

import ButtonMD from './stories/ButtonMarkdown.md';
import { PaginationStory } from './stories/PaginationStory';

const stories = createStories([
  { name: 'Button story', component: ButtonStory, markdownFile: ButtonMD },
  { name: 'Input story', component: InputStory, markdownString: InputStoryMarkdown },
  { name: 'Pagination story', component: PaginationStory },
]);

const options: ReactDocHooksOptions = {
  //headerLogo: <></>,
};

export const App = () => (
  <>
    <ReactDocHooks stories={stories} overrideTheme={{ primaryColor: 'green' }} />
  </>
);
