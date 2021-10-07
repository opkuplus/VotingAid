import jwt from "jwt-decode";
import React, { createContext, Component } from 'react';

export const UserContext = createContext();
class UserContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = this.existingLogin() || {
      user: 'Quest',
      email: '',
      school: '',
      loggedIn: false,
      language: 'fin',
      token: '',
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('language')) {
      this.setState({ language: sessionStorage.getItem('language') })
    }
  }

  changeLanguage = (e) => {
    this.setState({ language: e });
    sessionStorage.setItem('language', e);
  }

  changeUser = (user, email, school, loggedIn, token) => {
    this.setState({
      user: user,
      email: email,
      school: school,
      loggedIn: loggedIn,
      token: token,
    });
  }

  logOut = () => {
    this.changeUser('Quest', '', '', false, '');
    /*sessionStorage.removeItem('email');
    sessionStorage.removeItem('status');*/
    sessionStorage.removeItem('token');
  }

  checkExistingLogin = () => {
    /*let email = sessionStorage.getItem('email');
    let status = sessionStorage.getItem('status');*/
    let storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      let decodedToken = jwt(storedToken)
      this.changeUser(decodedToken.status, decodedToken.email, decodedToken.school, true, storedToken);
    }
  }

  existingLogin() {
    let storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      let decodedToken = jwt(storedToken)
      return {
        user: decodedToken.status,
        email: decodedToken.email,
        school: decodedToken.school,
        loggedIn: true,
        token: storedToken,
      }
    }
  }

  render() {
    return (
      <UserContext.Provider value={{
        ...this.state,
        changeUser: this.changeUser,
        checkExistingLogin: this.checkExistingLogin,
        logOut: this.logOut,
        changeLanguage: this.changeLanguage,
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;