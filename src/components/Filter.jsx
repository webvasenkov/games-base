import React, { useState, useEffect } from 'react';
import { ReactComponent as All } from '../assets/all.svg';
import { ReactComponent as Windows } from '../assets/windows.svg';
import { ReactComponent as PlayStation } from '../assets/play-station.svg';
import { ReactComponent as Xbox } from '../assets/xbox.svg';
import { ReactComponent as Android } from '../assets/android.svg';
import { ReactComponent as iOS } from '../assets/ios.svg';
import { ReactComponent as Linux } from '../assets/linux.svg';
import { ReactComponent as Nintendo } from '../assets/nintendo.svg';
import { ReactComponent as Web } from '../assets/web.svg';
import { filterGames } from '../redux/reducers/games';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const filterData = [
  { Icon: All, name: 'All' },
  { Icon: Windows, name: 'Windows' },
  { Icon: PlayStation, name: 'PlayStation' },
  { Icon: Xbox, name: 'Xbox' },
  { Icon: Android, name: 'Android' },
  { Icon: iOS, name: 'iOS' },
  { Icon: Linux, name: 'Linux' },
  { Icon: Nintendo, name: 'Nintendo' },
  { Icon: Web, name: 'Web' },
];

const Filter = () => {
  const [active, setActive] = useState('All');
  const { searched } = useSelector(({ games }) => games);
  const dispatch = useDispatch();

  const handleActiveClick = (name) => () => {
    setActive(name);
  };

  useEffect(() => {
    dispatch(filterGames(active));
  }, [dispatch, active, searched]);

  return (
    <FilterStyled>
      <List>
        {filterData.map(({ Icon, name }) => (
          <Item key={name} active={active === name} onClick={handleActiveClick(name)}>
            <Icon />
            <Text>{name}</Text>
          </Item>
        ))}
      </List>
    </FilterStyled>
  );
};

export default Filter;

const FilterStyled = styled.div`
  margin-top: 1em;
`;

const List = styled.ul`
  padding: 0.5em 1.55em;
  border-radius: 1.5em;
  display: flex;
  list-style: none;
`;
const Item = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 2em;
  color: #fff;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transition: all 0.3s ease-in-out;

  svg {
    width: 1em;
    fill: #fff;
    margin-right: 0.33em;
  }

  &:hover {
    opacity: 1;
  }
`;

const Text = styled.span``;
