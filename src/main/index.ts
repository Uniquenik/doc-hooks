import { FC } from 'react';

export { ReactDocHooks } from './reactDocHooks';
export { createStories } from './stories/';

export { useStringControl } from './controls/stringControl';
export { useCheckboxControl } from './controls/checkboxControl';
export { useColorRadioControl } from './controls/colorRadioControl';
export { useRecordRadioControl } from './controls/keyValueRadioControl';
export { useRadioControl } from './controls/radioControl';
export { useSwitchControl } from './controls/switchControl';
export { useNumberControl } from './controls/numberControl';

export type StoryItem = { id: string; name: string; component: FC; markdownString?: string; markdownFile?: string };

export type ReactDocHooksOptions = {
  headerLogo?: JSX.Element;
  headerRightContent?: JSX.Element;
  changePrimaryColor?: boolean;
};
