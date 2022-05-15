import React, { useState } from 'react';
import { ReactComponent as Search } from '../assets/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch, resetSearch } from '../redux/reducers/games';
import { motion } from 'framer-motion';
import Filter from './Filter';
import background from '../assets/background.jpg';
import styled, { keyframes } from 'styled-components';

const Header = () => {
  const dispatch = useDispatch();
  const { searched } = useSelector(({ games }) => games);
  const [text, setText] = useState('');

  const handleInputText = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getSearch(text));
    setText('');
    event.target.reset();
  };

  const handleClickLogo = () => {
    if (searched.length) dispatch(resetSearch());
    return;
  };

  const moveDown = {
    hidden: { y: '-20%', opacity: 0 },
    visible: { y: '0', opacity: 1, transition: { duration: 1 } },
  };

  return (
    <HeaderStyled>
      <Container>
        <Background src={background} alt='Background' />
        <Wrapper variants={moveDown} initial='hidden' animate='visible'>
          <Logo onClick={handleClickLogo}>
            Games <span>| Base</span>
          </Logo>
          <SearchForm onSubmit={handleSubmit}>
            <SearchInput
              placeholder='Search game...'
              onChange={handleInputText}
            />
            <SearchButton type='submit'>
              <SearchIcon />
            </SearchButton>
          </SearchForm>
          <Filter />
        </Wrapper>
      </Container>
    </HeaderStyled>
  );
};

export default Header;

const blink = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.6;
  }


  100% {
    opacity: 0;
  }
`;

const HeaderStyled = styled.header`
  margin-bottom: 5em;
  position: relative;
`;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  height: 70vh;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(245, 245, 245, 1));
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(242, 8, 98, 0.5), #f20862);
    animation: ${blink} 5s linear infinite;
    z-index: -1;
  }

  @media (max-width: 720px) {
    &::before {
      background: none;
    }
  }
`;

const Wrapper = styled(motion.div)`
  padding: 5em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  @media (max-width: 720px) {
    width: 100%;
    padding: 2.5em;
  }
`;

const Background = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  filter: brightness(60%);
`;

const Logo = styled.div`
  z-index: 1;
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  cursor: pointer;

  span {
    cursor: pointer;
    font-weight: 200;
  }

  @media (max-width: 420px) {
    font-size: 1.5rem;
  }
`;

const SearchForm = styled.form`
  z-index: 1;
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  outline: initial;
  border: none;
  background: #fff;
  font-size: 1rem;
  padding: 0.7em 3em 0.7em 1.5em;
  font-weight: 200;
  font-family: 'Poppins', sans-serif;
  border-radius: 30em;
  width: 100%;
  transition: all 0.2s ease-out;

  &:focus {
    box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.15);
  }
`;

const SearchButton = styled.button`
  background: initial;
  border: initial;
  outline: initial;
  position: absolute;
  cursor: pointer;
  right: 1.4em;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const SearchIcon = styled(Search)`
  width: 1em;
  fill: #222;
`;
