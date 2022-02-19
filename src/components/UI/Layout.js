import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';

import Header from './Header'
import Footer from './Footer'

import lightTheme from './themes/light.json';
import darkTheme from './themes/dark.json';

import { Router } from "@reach/router"
import Home from "./Home"
import About from "./About"
import MyGame from "./MyGame";
import Play from "./Play";
import EndGame from "./EndGame";

export default function Layout() {
  const [isLight, setIsLight] = useState(true);

  function handleToggleTheme() {
      setIsLight(!isLight);
  }
  
  return (
    <ThemeProvider theme={isLight? lightTheme : darkTheme}>
        <Wrapper>
            <GlobalStyle/>
            <Header isLight={ isLight } handleToggleTheme={ handleToggleTheme }/>

            <Main>
                <Router>
                    <Home path="/" />
                    <About path="/about" />
                    <MyGame path="/my-game/:gameId" />
                    <Play path="/play-game/:gameId" />
                    <EndGame path="/end-game" />
                </Router>
            </Main>
            
            <Footer/>
        </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div``;

const Main = styled.div`
    min-height: calc(100vh - 180px);
    width: 96%;
    max-width: 1240px;
    margin: auto;
`;