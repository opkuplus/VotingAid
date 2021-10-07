import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import language from "../../properties/language";
import { UserContext } from "../../context/userContext";
import { endpoint } from "../../api";
import DefaultInput from "../../components/defaultInput";
import DefaultButton from "../../components/defaultButton";
import { DARK_GREEN, GREEN, WHITE } from "../../helpers/constants";

class Registration extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    };

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
      password_confirmation: this.state.password_confirmation,
      status: "Candidate",
    };
    if (this.state.password == this.state.password_confirmation) {
      axios.post(endpoint.register, user).then((res) => {
        console.log(user.email);
        console.log(res.data);
        Swal.fire({
          text: res.data.includes("address")
            ? language.registrationError[this.context.language]
            : "success",
          icon: res.data.includes("address") ? "error" : "success",
        });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: language.passwordConfirmationError[this.context.language],
      });
    }
  };

  render() {
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
          {language.registrationTitle[this.context.language]}
        </h1>
        <p style={{ textAlign: "center" }}>
          {language.registrationPageDescription[this.context.language]}
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
          <DefaultInput
            label={
              language.passwordConfirmationPlaceHolder[this.context.language]
            }
            type="password"
            name="password_confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <DefaultButton
            type="submit"
            text={language.registerButton[this.context.language]}
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
          </Link>
        </form>
      </div>
    );
  }
}

export default Registration;
