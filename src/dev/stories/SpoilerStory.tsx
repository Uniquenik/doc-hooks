import * as React from 'react';
import { FC } from 'react';
import { useNumberControl, useStringControl } from '../../main';
import { Spoiler } from '@mantine/core';

export const SpoilerStory: FC = () => {
  const [showLabelControl] = useStringControl({
    defaultValue: 'Show more',
    name: 'Show Label',
    minLength: 0,
    maxLength: 20,
    rowsCount: 1
  });

  const [hideLabelControl] = useStringControl({
    defaultValue: 'Hide',
    name: 'Hide Label',
    minLength: 0,
    maxLength: 20,
    rowsCount: 1
  });

  const [maxHeight] = useNumberControl({
    defaultValue: 120,
    min: 100,
    max: 400,
    name: 'Max Height',
    isInput: true
  })

  return (
    <Spoiler sx={{maxWidth: 500}} px={8} maxHeight={maxHeight} showLabel={showLabelControl} hideLabel={hideLabelControl} transitionDuration={0}>
      We Butter the Bread with Butter was founded in 2007 by Marcel Neumann, who was originally guitarist for Martin Kesici's band, and Tobias Schultka. The band was originally meant as a joke, but progressed into being a more serious musical duo. The name for the band has no particular meaning, although its origins were suggested from when the two original members were driving in a car operated by Marcel Neumann and an accident almost occurred. Neumann found Schultka "so funny that he briefly lost control of the vehicle." Many of their songs from this point were covers of German folk tales and nursery rhymes.
    </Spoiler>
  );
};

