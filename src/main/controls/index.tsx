import { RenderStringControl } from './stringControl';
import { FC } from 'react';
import { Control } from '../controlHooks';

const controlMap: Record<Control['type'], FC<any>> = {
  string: RenderStringControl,
};

export const RenderControl: FC<{ control: Control }> = ({ control }) => {
  const ControlComponent = controlMap[control.type];

  return <>{ControlComponent ? <ControlComponent {...control} /> : null}</>;
};
