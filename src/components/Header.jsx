import React, { useState } from 'react';
import { ReactComponent as Search } from '../assets/search.svg';
import { useDispatch } from 'react-redux';
import { getSearch, resetSearch } from '../redux/reducers/games';
import { motion } from 'framer-motion';
import background from '../assets/background.jpg';
import styled, { keyframes } from 'styled-components';

const Header = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleInputText = (event) => {
    setText(event.target.value);
  };

  const handleClickSearch = (event) => {
    dispatch(getSearch(text));
  };

  const handleClickLogo = () => {
    dispatch(resetSearch());
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
          <SearchForm>
            <SearchInput placeholder='Search game...' onChange={handleInputText} />
            <SearchButton onClick={handleClickSearch} />
          </SearchForm>
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
  min-height: 70vh;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgb(245, 245, 245));
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
`;

const Wrapper = styled(motion.div)`
  padding: 5em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
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
    font-weight: 200;
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
  padding: 0.7em 1.4em;
  font-weight: 200;
  font-family: 'Poppins', sans-serif;
  border-radius: 30em;
  width: 100%;
  transition: all 0.2s ease-out;

  &:focus {
    box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.15);
  }
`;

const SearchButton = styled(Search)`
  position: absolute;
  cursor: pointer;
  right: 1.4em;
  top: 50%;
  transform: translateY(-50%);
  width: 1em;
  fill: #222;
`;
