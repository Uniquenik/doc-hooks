import { FC } from 'react';
import { RenderStringControl } from './stringControl';
import { Control } from './index';
import { RenderCheckboxControl } from './checkboxControl';

const controlMap: Record<Control['type'], FC<any>> = {
  string: RenderStringControl,
  checkbox: RenderCheckboxControl,
};

export const ControlRender: FC<{ control: Control }> = ({ control }) => {
  const ControlComponent = controlMap[control.type];

  return <>{ControlComponent ? <ControlComponent {...control} /> : null}</>;
};
