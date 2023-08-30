import { uid } from '../utils';
import { StoryItem } from '../index';
import { FC } from 'react';

export type InputStoryItem = { component: FC, name?: string; markdownString?: string; markdownFile?: string };

export const createStories = (items: InputStoryItem[]): StoryItem[] => {
  return items.map(item => {
    let storyItem: StoryItem = {
      id: uid(),
      name: item?.name || item.component.name,
      ...item,
    };

    return storyItem;
  });
};
