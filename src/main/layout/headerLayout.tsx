import React from 'react';
import { Burger, createStyles, Group, Header, useMantineColorScheme, UnstyledButton } from '@mantine/core';
import { IconMoon, IconSignature, IconSun } from '@tabler/icons';

interface IHeaderProps {
  open: boolean;
  logo?: JSX.Element;
  rightContent?: JSX.Element;
  onClick: () => void;
}

export const HeaderLayout: React.FC<IHeaderProps> = props => {
  const { logo, rightContent, open, onClick } = props;

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const { classes } = useStyles();

  //Render
  const renderDefaultLogo = () => {
    return (
      <a href={'https://github.com/Uniquenik/doc-hooks'}>
        <Group spacing={0} align={'center'}>
          <IconSignature size={32} />
        </Group>
      </a>
    );
  };

  return (
    <Header height={56} className={classes.header}>
      <Group position={'apart'} align={'center'} className={classes.headerContent}>
        <Group spacing={32}>
          <Burger opened={open} onClick={onClick} size="sm" />
          {logo ? logo : renderDefaultLogo()}
        </Group>
        <Group spacing={32}>
          {rightContent && rightContent}
          <UnstyledButton onClick={() => toggleColorScheme()}>
            {colorScheme === 'light' ? <IconMoon /> : <IconSun />}
          </UnstyledButton>
        </Group>
      </Group>
    </Header>
  );
};

const useStyles = createStyles(theme => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  headerContent: {
    height: 56,
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
