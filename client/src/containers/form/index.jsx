import React, { Component } from "react";
import language from "../../properties/language";
import axios from "axios";
import { endpoint } from "../../api";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";
import DefaultInput from "../../components/defaultInput";
import DefaultButton from "../../components/defaultButton";
import { DARK_GREEN, GREEN, WHITE } from "../../helpers/constants";

export const FromValueItem = (props) => {
  return (
    <label
      onClick={() => props.handleClick(props.value)}
      className="boxContainer"
    >
      <span className={props.isActive ? "checkActive" : "checkPassive"}></span>
      <span
        style={{
          fontSize: 14,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {props.value}
      </span>
    </label>
  );
};

export const FormValueContainer = (props) => {
  const staticValue = [-2, -1, 0, 1, 2];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
      }}
    >
      {staticValue.map((value, idx) => (
        <FromValueItem
          value={value}
          isActive={props.answer === value}
          question={props.answer}
          idx={idx}
          handleClick={(value) => props.handleClick(value, props.idx)}
        />
      ))}
    </div>
  );
};

class Form extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      answersDesc: [],
      filledFormQuestion: [],
      area: "",
      path: this.props.location.pathname.split("/")[2],
      loader: true,
      required: true,
    };
  }

  componentDidMount() {
    console.log(this.state.path);
    let email = this.props.location.email;
    if (this.context.loggedIn) {
      {
        console.log(endpoint.questions);
      }
      axios.post(endpoint.questions, { data: this.state.path }).then((res) => {
        console.log(res);
        this.setState({ questions: res.data });
        axios.post(endpoint.fillForm, { data: email }).then((response) => {
          console.log(response);
          let oldQuestions = res.data;
          let questionDesc = [];
          let questionNumber = [];
          oldQuestions.map((question, idx) => {
            console.log("question");
            console.log(question);
            console.log("idx");
            console.log(idx);
            Object.assign(oldQuestions[idx], {
              questionValue: Object.values(response.data.filledForm).filter(
                (item) => isNaN(item)
              )[idx],
              questionNumber: Object.values(response.data.filledForm).filter(
                (item) => !isNaN(item)
              )[idx],
            });
            questionDesc.push(
              Object.values(response.data.filledForm).filter((item) =>
                isNaN(item)
              )[idx]
            );
            questionNumber.push(
              Object.values(response.data.filledForm).filter(
                (item) => !isNaN(item)
              )[idx]
            );
          });
          this.setState({ questions: oldQuestions });
          this.setState({
            answersDesc: questionDesc,
            answers: questionNumber,
          });
          this.setState({ loader: false });
        });
      });
    } else {
      {
        console.log(endpoint.questions);
      }
      axios.post(endpoint.questions, { data: this.state.path }).then((res) => {
        this.setState({ loader: false });
        this.setState({ questions: res.data });
      });
    }
  }

  isQuest(counter) {
    if (this.context.user !== "Quest") {
      return (
        <input
          type="text"
          name={counter}
          placeholder="Explain your choice"
          style={{ marginBottom: "41px", width: "50%" }}
          onChange={this.handleChange}
          required={this.state.required}
          // disabled={this.state.disabled}
        />
      );
    }
  }

  handleChange = (e) => {
    this.state.answersDesc[e.currentTarget.name] = e.currentTarget.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.context.user !== "Quest") {
      axios
        .post(
          endpoint.send,
          {
            ans: this.state.answers,
            desc: this.state.answersDesc,
            email: this.context.email,
            studentAssociation: this.context.path,
          },
          {
            headers: {
              Authorization: `Bearer ${this.context.token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: res.data /*language.filledFormAlert[this.context.language]*/, //  TEXT AND ICON DEFINITION FROM SERVER ROW 308
            icon: res.data.includes("Error") ? "error" : "success",
            confirmButtonText: language.continueHolder[this.context.language],
          });
        });
    } else {
      this.props.history.push({
        pathname: "/suggestedCandidates",
        data: {
          answers: this.state.answers,
          studentAssociation: this.state.path,
        },
      });
    }
  };

  handleClick = (value, idx) => {
    const oldAnswers = [...this.state.answers];
    oldAnswers[idx] = parseInt(value);
    this.setState({
      answers: [...oldAnswers],
    });
    // let sum = this.state.answers.reduce((result, number) => result + number);
    // console.log(sum);
  };

  render() {
    return (
      <div
        className="homeScreen"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {this.state.loader ? (
          <div style={{ display: "flex" }}>
            <p style={{ textAlign: "center" }}>Waiting for data...</p>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            {this.state.questions &&
              React.Children.toArray(
                this.state.questions.map((question, idx) => (
                  <>
                    <div className="questionSet">
                      <label style={{ fontSize: 16 }}>
                        <strong>
                          {language.questionHolder[this.context.language]}
                        </strong>
                        {
                          {
                            fin: question.questionFin,
                            eng: question.question,
                            swe: question.questionSwe,
                          }[this.context.language]
                        }
                      </label>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 14,
                        }}
                      >
                        <span>
                          {language.disagreeButton[this.context.language]}
                        </span>
                        <span className="agg">
                          {language.agreeButton[this.context.language]}
                        </span>
                      </div>

                      {this.state.answers && (
                        <FormValueContainer
                          answer={this.state.answers[idx]}
                          idx={idx}
                          handleClick={(value, idx) =>
                            this.handleClick(value, idx)
                          }
                        />
                      )}

                      {this.context.user !== "Quest" && this.state.answersDesc && (
                        <DefaultInput
                          label="Explain your choice"
                          type="text"
                          name={idx}
                          value={this.state.answersDesc[idx]}
                          onChange={this.handleChange}
                          // disabled={this.state.disabled}
                          required={this.state.required}
                        />
                      )}
                    </div>
                  </>
                ))
              )}

            <DefaultButton
              type="submit"
              borderColor={DARK_GREEN}
              backgroundColor={GREEN}
              textColor={WHITE}
              text={language.fillFormButton[this.context.language]}
            />
          </form>
        )}
      </div>
    );
  }
}
export default Form;
