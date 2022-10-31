import { StoryItem } from '../type';
import { uid } from '../utils';

export const createStories = (items: Omit<StoryItem, 'id'>[]): StoryItem[] => {
  return items.map(item => {
    let storyItem: StoryItem = {
      id: uid(),
      ...item,
    };

    return storyItem;
  });
};
