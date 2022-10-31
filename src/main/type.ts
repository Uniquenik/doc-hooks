import { Control } from './controls';
import { FC } from 'react';

export type initialKeys<T> = Exclude<keyof T, '' | 'type' | 'id' | 'value' | 'setValue'>;

export type StoryItem = { id: string; name: string; component: FC; markdownString?: string; markdownFile?: string };

export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};

export type UseDefaultControl<ControlType extends Control> = (
  control: Pick<ControlType, initialKeys<ControlType>>,
) => [ControlType['value'], ControlType['setValue']];
