import React, { Component } from "react";
import language from "../../properties/language";
import axios from "axios";
import { endpoint } from "../../api";
import { UserContext } from "../../context/userContext";
import DefaultInput from "../../components/defaultInput";

export const FromValueItem = (props) => {
  /* console.log('formvalueitem')
console.log(props)*/
  return (
    <label className="boxContainer">
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
  /*console.log('formvaluecontainer')
console.log(props)*/
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
        />
      ))}
    </div>
  );
};

export class CandidateAnswers extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      answersDesc: [],
      filledFormQuestion: [],
      area: "",
      path: this.props.candidateInfo.studentAssociation,
      loader: true,
      disabled: true,
    };
  }

  componentDidMount() {
    var email = this.props.candidateInfo.email;
      console.log(this.state.path)
    axios.post(endpoint.questions, { data: this.state.path }).then((res) => {
      this.setState({ questions: res.data });
      axios.post(endpoint.fillForm, { data: email }).then((response) => {
        console.log(response);
        let oldQuestions = res.data;
        let questionDesc = [];
        let questionNumber = [];
        oldQuestions.map((question, idx) => {
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
  }

  isQuest(counter) {
    if (this.context.user !== "Quest") {
      return (
        <input
          type="text"
          name={counter}
          placeholder="Explain your choice"
          style={{ marginBottom: "41px", width: "50%" }}
          disabled={this.state.disabled}
        />
      );
    }
  }

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
          this.state.questions &&
          React.Children.toArray(
            this.state.questions.map((question, idx) => (
              <>
                <div className="questionSet">
                  <label style={{ fontSize: 16 }}>
                    <strong>
                      {language.questionHolder[this.context.language]}
                    </strong>
                    {this.context.language === "fin"
                      ? question.questionFin
                      : question.question}
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
                    />
                  )}

                  {this.state.answersDesc && (
                    <DefaultInput
                      label="Explain your choice"
                      type="text"
                      name={idx}
                      value={this.state.answersDesc[idx]}
                      disabled={this.state.disabled}
                    />
                  )}
                </div>
              </>
            ))
          )
        )}
      </div>
    );
  }
}
export default CandidateAnswers;
