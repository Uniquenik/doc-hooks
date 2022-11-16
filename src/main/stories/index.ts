import { uid } from '../utils';
import { StoryItem } from '../index';

export const createStories = (items: Omit<StoryItem, 'id'>[]): StoryItem[] => {
  return items.map(item => {
    let storyItem: StoryItem = {
      id: uid(),
      ...item,
    };

    return storyItem;
  });
};
