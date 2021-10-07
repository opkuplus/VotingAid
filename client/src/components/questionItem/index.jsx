import React, { Component } from "react";
import axios from "axios";
import {
  DARK_GREEN,
  DARK_RED,
  GREEN,
  RED,
  WHITE,
} from "../../helpers/constants";
import DefaultButton from "../defaultButton";
import DefaultInput from "../defaultInput";
import { endpoint } from "../../api";
import language from "../../properties/language";
import { UserContext } from "../../context/userContext";

class QuestionsItem extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      inputFinnish: "",
      inputEnglish: "",
      inputSwedish: "",
    };
  }

  componentDidMount() {
    this.setState({
      inputFinnish: this.props.question.questionFin,
      inputEnglish: this.props.question.question,
      inputSwedish: this.props.question.questionSwe,
    });
  }

  changeInputValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  confirmChange = (e) => {
    e.preventDefault();
    var data = {
      question: this.state.inputEnglish,
      questionFin: this.state.inputFinnish,
      questionSwe: this.state.inputSwedish,
      id: this.props.question._id,
    };

    axios
      .post(endpoint.submitQhuahoo, { data })
      .then((res) => {
        alert("We've changed you");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  confirmDelete = (e) => {
    e.preventDefault();
    axios
      .post(endpoint.deleteQhuahoo, { id: this.props.question._id })
      .then((res) => {
        alert("is removed");
        console.log(res);
        this.props.refreshQuestions();
      });
  };

  render() {
    const { idx, question } = this.props;
    return (
      <div
        key={idx}
        style={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #999999",
          padding: "20px 0",
        }}
      >
        <DefaultInput
          label="Kysymys suomeksi"
          type="text"
          name="inputFinnish"
          value={this.state.inputFinnish}
          onChange={this.changeInputValue}
        />

        <DefaultInput
          label="Question in English"
          type="text"
          name="inputEnglish"
          value={this.state.inputEnglish}
          onChange={this.changeInputValue}
        />

        <DefaultInput
          label="Frågan på svenska"
          type="text"
          name="inputSwedish"
          value={this.state.inputSwedish}
          onChange={this.changeInputValue}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <b style={{ fontSize: 16 }}>
            {" "}
            {language.school[this.context.language]} {question.area}
          </b>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <DefaultButton
                borderColor={DARK_GREEN}
                backgroundColor={GREEN}
                textColor={WHITE}
                onClick={this.confirmChange}
                text={language.editButton[this.context.language]}
              />
            </div>
            <div>
              <DefaultButton
                borderColor={DARK_RED}
                backgroundColor={RED}
                textColor={WHITE}
                onClick={this.confirmDelete}
                text={language.deleteButton[this.context.language]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionsItem;
