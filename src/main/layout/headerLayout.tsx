import React from 'react';
import { Burger, createStyles, Group, Header, useMantineColorScheme, UnstyledButton, Text } from '@mantine/core';

interface IHeaderProps {
  open: boolean;
  onClick: () => void;
}

export const HeaderLayout: React.FC<IHeaderProps> = props => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  //Render
  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={props.open} onClick={props.onClick} size="sm" />
        </Group>
        <UnstyledButton onClick={() => toggleColorScheme()}>
          <Text size="sm">{colorScheme === 'light' ? 'Dark' : 'Light'} theme</Text>
        </UnstyledButton>
      </div>
    </Header>
  );
};

const useStyles = createStyles(theme => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));
