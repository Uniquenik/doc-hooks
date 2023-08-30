import React from 'react';
import { ReactDocHooks, ReactDocHooksOptions } from '../main';
import { ButtonStory } from './stories/ButtonStory';
import { InputStory, InputStoryMarkdown } from './stories/InputStory';
import { createStories } from '../main';

import ButtonMD from './stories/ButtonMarkdown.md';
import { PaginationStory } from './stories/PaginationStory';
import { DrawerStory } from './stories/DrawerStory';
import { SpoilerStory } from './stories/SpoilerStory';

const stories = createStories([
  { name: 'Button story', component: ButtonStory, markdownFile: ButtonMD },
  { name: 'PinInput story', component: InputStory, markdownString: InputStoryMarkdown },
  { name: 'Pagination story', component: PaginationStory },
  { name: 'Drawer story', component: DrawerStory },
  { component: SpoilerStory },
]);

const options: ReactDocHooksOptions = {
  //headerLogo: <></>,
};

export const App = () => (
  <>
    <ReactDocHooks stories={stories} options={{ changePrimaryColor: true }} />
  </>
);
