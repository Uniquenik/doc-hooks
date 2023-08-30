import React from 'react';
import ReactDOM from 'react-dom/client';
import { ButtonStory } from './ButtonStory';
import { createStories, ReactDocHooks, ReactDocHooksOptions } from 'react-doc-hooks';

const stories = createStories([
    { name: 'Button story', component: ButtonStory },
]);

const options: ReactDocHooksOptions = {
    //headerLogo: <></>,
};

export const App = () => (
  <>
      <ReactDocHooks stories={stories} options={{ changePrimaryColor: true }} />
  </>
);


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
