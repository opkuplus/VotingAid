import React from 'react';
import './App.css';
import './AppMini.css';
import Navigation from './navigation'
import UserContextProvider from './context/userContext';
import { ThemeContext } from "./context/ThemeProvider";
import classNames from 'classnames';

export default function App() {

  const isDark = (mode) => {
    return mode === 'dark';
  }

  return <>
    <UserContextProvider>
      <ThemeContext.Consumer>
        {theme => (
          <div className={classNames({
            'App': true,
            'BodyColor': isDark(theme.mode)
          })}>
            <Navigation />
          </div>
        )}
      </ThemeContext.Consumer>
    </UserContextProvider>
  </>
}