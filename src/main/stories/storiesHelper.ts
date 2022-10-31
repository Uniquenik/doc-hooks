import { StoryItem } from '../type';

export default class StoriesHelper {
  static getStoryById = (id: string, stories: Array<StoryItem>) => {
    return stories.find(item => item.id === id);
  };

  static searchStory = (searchValue: string, stories: Array<StoryItem>) => {
    return stories.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
  };
}
