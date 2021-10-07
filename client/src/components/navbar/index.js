import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import language from "../../properties/language";
import { BsLock } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import ThemeToggleButton from "../themeToggleButton";
import { HiOutlineUserAdd } from "react-icons/hi";

import { UserContext } from "../../context/userContext";
import { ThemeContext } from "../../context/ThemeProvider";

import classNames from 'classnames';
import Sweden from '../../assets/icons/sweden.svg'
import Finland from '../../assets/icons/finland.svg'
import UK from '../../assets/icons/uk.svg'

class Navbar extends Component {
  static contextType = UserContext;

  componentDidMount() {
    const { checkExistingLogin } = this.context;
    checkExistingLogin();
  }

  isDark = (mode) => {
    return mode === 'dark';
  }

  render() {
    const { logOut, changeLanguage, changeUser } = this.context;
    // language,
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div className={classNames({
            'navLoginWrapper': true,
            'navLoginWrapperLight': !this.isDark(theme.mode),
            'navLoginWrapperDark': this.isDark(theme.mode),

          })}>
            <div className={classNames({
              'container': true,
              'navLoginContainer': true
            })}>
              <ThemeToggleButton />
              <NavLink to="/">
                <BiHome style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }} />
                <span style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }}>
                  {language.navigationHome[this.context.language]}
                </span>
              </NavLink>
              {this.context.loggedIn ? <>
                <NavLink
                  style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }}
                  to="/" // TODO: You can't navigate in any route if this route does not exist for this i remove '/logout' to '/'
                  onClick={() => logOut()} >
                  <BsLock />
                  <span style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }}>
                    {language.navigationLogOut[this.context.language]}
                  </span>
                </NavLink>
                <NavLink to="/Profile">
                  <CgProfile style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }} />
                  <span style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }}>
                    {language.navigationProfile[this.context.language]}
                  </span>
                </NavLink>
              </>
                : <>
                  <NavLink to="/Login">
                    <BsLock style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }} />
                    <span style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }}>
                      {language.navigationLogin[this.context.language]}
                    </span>
                  </NavLink>
                  <NavLink to="/Register">
                    <HiOutlineUserAdd style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }} />
                    <span style={{ color: this.isDark(theme.mode) ? '#FFFFFF' : '#000000' }}>
                      {language.navigationRegister[this.context.language]}
                    </span>
                  </NavLink>
                </>
              }
              <div>
                <span onClick={() => changeLanguage('fin')} style={{ padding: '0 10px' }}>
                  <img style={{ width: 30 }} src={Finland} alt="Finland Flag" />
                </span>
                <span onClick={() => changeLanguage('swe')} style={{ padding: '0 10px' }}>
                  <img style={{ width: 30 }} src={Sweden} alt="Sweden Flag" />
                </span>
                <span onClick={() => changeLanguage('eng')} style={{ padding: '0 10px' }}>
                  <img style={{ width: 30 }} src={UK} alt="United Kingdom of Great Britain Flag" />
                </span>
              </div>
            </div>
          </div>
        )}</ThemeContext.Consumer>
    );
  }
}

export default Navbar