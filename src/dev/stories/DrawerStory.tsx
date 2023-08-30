import * as React from 'react';
import { FC } from 'react';
import {
  useNumberControl,
  useRadioControl,
  useStringControl,
} from '../../main';
import { Button, Drawer, Group, Stepper, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const DrawerStory: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [stringControl] = useStringControl({
    defaultValue: 'Текст сообщения',
    name: 'String control',
    minLength: 3,
    maxLength: 1000,
  });

  const [positionValue] = useRadioControl({
    defaultValue: 'left',
    name: 'Button variant',
    options: ['left', 'right', 'top', 'bottom'],
  });

  const sliderMarks = [
    { value: 25, label: 'sm' },
    { value: 50, label: 'md' },
    { value: 75, label: 'lg' },
    { value: 100, label: 'xl' },
  ];
  const [sizeValue] = useNumberControl({
    defaultValue: 50,
    name: 'Size button',
    min: 25,
    step: 5,
    marks: sliderMarks,
  });

  const [active] = useNumberControl({
    defaultValue: 1,
    min: 1,
    max: 3,
    name: 'Active step'
  })


  return (
    <>
      <Drawer opened={opened} onClose={close} title="Drawer sample" position={positionValue as any} size={`${sizeValue}%`}>
        <Text size={'xl'} align={'center'}>{stringControl}</Text>
        <Stepper active={active} breakpoint="sm" py={24} px={16}>
          <Stepper.Step label="First step" description="Create an account">
            <Text size={'lg'} align={'center'}>Step 1 content: Create an account</Text>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email">
            <Text size={'lg'} align={'center'}>Step 2 content: Verify email</Text>
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            <Text size={'lg'} align={'center'}>Step 3 content: Get full access</Text>
          </Stepper.Step>
          <Stepper.Completed>
            <Text size={'lg'} align={'center'}>Completed</Text>
          </Stepper.Completed>
        </Stepper>
      </Drawer>

      <Group position="center">
        <Button onClick={open}>Open Drawer</Button>
      </Group>
    </>
  );
};

export const InputStoryMarkdown: string = `## Заголовок
    текст

  -список

  -список
`;

