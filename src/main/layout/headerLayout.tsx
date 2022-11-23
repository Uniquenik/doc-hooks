import React from 'react';
import {
  Burger,
  createStyles,
  Group,
  Header,
  useMantineColorScheme,
  UnstyledButton,
  useMantineTheme,
  Menu,
  Box,
  ActionIcon,
  ColorSwatch,
  CheckIcon,
} from '@mantine/core';
import { IconMoon, IconPaint, IconSignature, IconSun } from '@tabler/icons';

interface IHeaderProps {
  open: boolean;
  currentPrimaryColor: string;
  logo?: JSX.Element;
  rightContent?: JSX.Element;
  isCurrentPrimaryColor?: boolean;
  onClick: () => void;
  setCurrentPrimaryColor: (value: string) => void;
}

export const HeaderLayout: React.FC<IHeaderProps> = props => {
  const { logo, rightContent, open, onClick, currentPrimaryColor, setCurrentPrimaryColor } = props;

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const { classes } = useStyles();

  const theme = useMantineTheme();

  //Handlers
  const handleChooseColor = (color: string) => {
    setCurrentPrimaryColor(color);
  };

  //Render
  const renderDefaultLogo = () => {
    return (
      <a href={'https://github.com/Uniquenik/doc-hooks'}>
        <Group spacing={0} align={'center'}>
          <IconSignature color={'#FAB005'} size={32} />
        </Group>
      </a>
    );
  };

  const renderColorMenu = () => {
    return (
      <Box>
        <Menu trigger="hover" position={'bottom'} width={200}>
          <Menu.Target>
            <ActionIcon>
              <IconPaint size={20} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Group spacing={8}>
              {Object.keys(theme.colors).map(color => {
                return (
                  <ColorSwatch
                    color={theme.colors[color][5]}
                    key={color}
                    size={30}
                    component="button"
                    sx={{ color: '#fff', cursor: 'pointer' }}
                    onClick={() => handleChooseColor(color)}
                  >
                    {color === currentPrimaryColor && <CheckIcon width={15} />}
                  </ColorSwatch>
                );
              })}
            </Group>
          </Menu.Dropdown>
        </Menu>
      </Box>
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
          {props?.isCurrentPrimaryColor && renderColorMenu()}
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
