import { FC } from 'react';
interface IMainWindowProps<T> {
    stories: T;
}
export declare function MainWindow<T extends Record<string, FC> = Record<string, never>>(props: IMainWindowProps<T>): JSX.Element;
export {};
