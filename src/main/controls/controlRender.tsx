import { FC } from 'react';
import { RenderStringControl } from './stringControl';
import { Control } from './index';
import { RenderCheckboxControl } from './checkboxControl';
import { RenderRadioControl } from './radioControl';
import { RenderKeyValueRadioControl } from './keyValueRadioControl';
import { RenderSwitchControl } from './switchControl';
import { RenderColorRadioControl } from './colorRadioControl';

const controlMap: Record<Control['type'], FC<any>> = {
  string: RenderStringControl,
  checkbox: RenderCheckboxControl,
  radio: RenderRadioControl,
  keyValueRadio: RenderKeyValueRadioControl,
  switch: RenderSwitchControl,
  colorRadio: RenderColorRadioControl,
};

export const ControlRender: FC<{ control: Control }> = ({ control }) => {
  const ControlComponent = controlMap[control.type];

  return <>{ControlComponent ? <ControlComponent {...control} /> : null}</>;
};
