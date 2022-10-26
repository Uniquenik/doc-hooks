import React, { useContext } from 'react';
import { ControlsContext } from '../context';
import { useSubjectValue } from '../context/useSubject';
import { RenderControl } from '../controls';

export type IControlLayoutProps = {};

export const ControlLayout: React.FC<IControlLayoutProps> = props => {
  const { controls: controlsSubject } = useContext(ControlsContext);
  const controls = useSubjectValue(controlsSubject);

  //Renders
  return (
    <div>
      <div>
        {Object.entries(controls).map(([id, control]) => (
          <RenderControl key={id} control={control} />
        ))}
      </div>
    </div>
  );
};
