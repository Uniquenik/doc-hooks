import React, { FC } from 'react';
import { Stack } from '@mantine/core';

type ErrorScreenProps = { error: Error; tryAgain: () => void; storyKey?: string };

export const ErrorScreen: FC<ErrorScreenProps> = props => <Stack>error</Stack>;
