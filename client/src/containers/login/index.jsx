import React, { Component } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import language from "../../properties/language";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { endpoint } from "../../api";
import DefaultInput from "../../components/defaultInput";
import DefaultButton from "../../components/defaultButton";
import { DARK_GREEN, GREEN, WHITE } from "../../helpers/constants";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post(endpoint.login, user).then((res) => {
      console.log(res);
      if (res) {
        const { changeUser } = this.context;
        changeUser(
          res.data.tokenUser.status,
          res.data.tokenUser.email,
          res.data.tokenUser.school,
          true,
          res.data.token
        );
        if (!this.context.user || !this.context.email) {
          changeUser("Quest", "", "", false, this.context.language);
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: language.wrongPasswordHolder[this.context.language],
          });
        } else {
          Swal.fire({
            title: language.loginHolder[this.context.language],
            icon: "success",
            confirmButtonText: "Confirm",
          });
          /*sessionStorage.setItem("email", this.context.email);
          sessionStorage.setItem("status", this.context.user);*/
          sessionStorage.setItem("language", this.context.language);
          sessionStorage.setItem("token", this.context.token);
          this.props.history.push({
            pathname: "/",
          });
        }
      }
    });
  };

  static contextType = UserContext;

  render() {
    const { changeUser } = this.context;
    return (
      <div
        className="homeScreen"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
		<h1 style={{ textAlign: "center" }}>
          {language.loginTitle[this.context.language]}
        </h1>
        <p style={{ textAlign: "center" }}>
          {language.loginPageDescription[this.context.language]}
        </p>
        <form onSubmit={this.handleSubmit}>
          <DefaultInput
            label={language.emailPlaceHolder[this.context.language]}
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <DefaultInput
            label={language.passwordPlaceHolder[this.context.language]}
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <DefaultButton
            type="submit"
            text={language.loginButton[this.context.language]}
            borderColor={DARK_GREEN}
            backgroundColor={GREEN}
            textColor={WHITE}
          />
          <Link
            to={{
              pathname: "/",
            }}
          >
            {" "}
            {language.mainPageLink[this.context.language]}{" "}
          </Link>{" "}
          <br></br>
          <br></br>
          {/* <p className="forgot-password text-right">
            <Link
              to={{
                pathname: "/newPassword"
              }}> Unohditko salasanan? </Link></p> */}
        </form>
      </div>
    );
  }
}

export default Login;
