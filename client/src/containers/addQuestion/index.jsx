import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import language from "../../properties/language";
import { UserContext } from "../../context/userContext";
import { DARK_GREEN, GREEN, WHITE } from "../../helpers/constants";
import DefaultButton from "../../components/defaultButton";
import { endpoint } from "../../api";
import DefaultInput from "../../components/defaultInput";
class AddQuestion extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      questionFin: "",
      questionSwe: "",
      area: "",
      selectValue: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  selectBoxChanged = (event) => {
    this.setState({ selectValue: event.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      question: this.state.question,
      questionFin: this.state.questionFin,
      questionSwe: this.state.questionSwe,
      area: this.state.selectValue,
    };
    axios
      .post(endpoint.addQuestion, question)
      .then((res) => {
        Swal.fire({
          title: language.successQuestionAddedHolder[this.context.language],
          icon: "success",
          confirmButtonText: language.continueHolder[this.context.language],
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ question: "" });
    this.setState({ questionFin: "" });
    this.setState({ questionSwe: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div
          style={{
            marginTop: 20,
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#FFFFFF",
            padding: 15,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <DefaultInput
              label="Kysymys suomeksi"
              type="question"
              name="questionFin"
              value={this.state.questionFin}
              onChange={this.handleChange}
            />
            <DefaultInput
              label="Question in english"
              type="question"
              name="question"
              value={this.state.question}
              onChange={this.handleChange}
            />
            <DefaultInput
              label="Frågan på svenska"
              type="question"
              name="questionSwe"
              value={this.state.questionSwe}
              onChange={this.handleChange}
            />
            <label style={{ fontSize: 16, marginTop: 5 }}>
              {language.school[this.context.language]}
            </label>
            <select
              style={{
                marginBottom: 10,
                fontSize: 16,
                padding: "6px 4px",
              }}
              value={this.state.selectValue}
              onChange={this.selectBoxChanged}
            >
              <option value="Undefined">Undefined</option>
              <option value="ASK">ASK</option>
              <option value="Helga">Helga</option>
              <option value="HUMAKO">HUMAKO</option>
              <option value="JAMKO">JAMKO</option>
              <option value="Laureamko">Laureamko</option>
              <option value="METKA">METKA</option>
              <option value="O'Diako">O'Diako</option>
              <option value="TUO">TUO</option>
            </select>
            <DefaultButton
              type="submit"
              borderColor={DARK_GREEN}
              backgroundColor={GREEN}
              textColor={WHITE}
              text={language.addQuestionButton[this.context.language]}
            />
          </div>
        </div>
      </form>
    );
  }
}
export default AddQuestion;
