import { FC } from 'react';
interface INavbarProps {
    activeIndex: number;
    storiesList: Array<[string, FC]>;
    setActiveIndex: (value: number) => void;
}
export declare const Navigation: (props: INavbarProps) => JSX.Element;
export {};
