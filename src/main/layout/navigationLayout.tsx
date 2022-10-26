import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { createStyles, Navbar, TextInput } from '@mantine/core';
import { UnstyledButton } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';

interface INavbarProps {
  activeKey: string;
  storiesList: Array<[string, FC]>;
  setActiveKey: (value: string) => void;
}

export const NavigationLayout = (props: INavbarProps) => {
  const { activeKey, setActiveKey } = props;
  const { classes, cx } = useStyles();

  const [searchValue, setSearchValue] = useDebouncedState('', 200);
  const [searchResults, setSearchResults] = useState<Array<[string, FC]>>(props.storiesList);

  //Effects
  useEffect(() => {
    if (searchValue !== '') {
      setSearchResults(props.storiesList.filter(item => item[0].toLowerCase().includes(searchValue.toLowerCase())));
      return;
    }
    setSearchResults(props.storiesList);
  }, [searchValue]);

  //Handlers
  const handleItemClick = (key: string) => {
    setActiveKey(key);
  };

  const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  //Render
  return (
    <Navbar height={840} width={{ sm: 300 }} pt={16} className={classes.navbar}>
      <TextInput label="Search" defaultValue={searchValue} pb={10} onChange={handleChangeSearchValue} />
      {searchResults.map((item, index) => {
        return (
          <Navbar.Section key={index} onClick={() => handleItemClick(item[0])}>
            <UnstyledButton className={cx(classes.link, { [classes.linkActive]: item[0] === activeKey })}>
              {item[0]}
            </UnstyledButton>
          </Navbar.Section>
        );
      })}
    </Navbar>
  );
};

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    width: '100%',
    lineHeight: '44px',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  linkActive: {
    '&, &:hover': {
      borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
      color: theme.white,
    },
  },
}));
