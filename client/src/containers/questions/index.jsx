import React, { Component } from "react";
import axios from "axios";
import language from "../../properties/language";
import { UserContext } from "../../context/userContext";

import QuestionsItem from "../../components/questionItem";
import { endpoint } from "../../api";

class Questions extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      filteredQuestions: [],
      schools: [],
      filtersData: [],
      selectBox: "allQuestion",
    };
  }

  componentDidMount() {
    this.allQuestions();
    console.log(this.context.school);
    this.FilterQuestions(this.context.school);
  }

  changeInputValue = (e, idx) => {
    let newQuestions = [...this.state.questions];
    let question = newQuestions.findIndex((q) => q._id === idx);
    //newQuestions[question].question = e.target.value;
    newQuestions[question].question = e.target.value;
    this.setState({ questions: [...newQuestions] });
  };

  allQuestions = () => {
    console.log("inside");
    this.setState({ questions: [] });
    axios.get(endpoint.allQuestions).then((res) => {
      console.log(res.data);
      this.setState({ questions: res.data });
      let newFilters = [];
      res.data.map((filter) => newFilters.push(filter.area));
      let unique = [...new Set(newFilters)];
      this.setState({ filtersData: [...unique] });
    });
  };

  FilterQuestions = (filter) => {
    console.log(filter);
    this.setState({ questions: [] });
    axios.post(endpoint.filteredQuestions, { data: filter }).then((res) => {
      this.setState({ filteredQuestions: res.data });
    });
  };

  // handleChange = (e) => {
  //   if (e.target.value !== "Select filter") {
  //     console.log("not select filter");
  //     this.FilterQuestions(e.target.value);
  //     this.setState({ selectBox: e.target.value });
  //   } else {
  //     console.log("select filter");
  //     this.allQuestions();
  //     this.setState({ selectBox: "allQuestion" });
  //   }
  // };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "rgba(255, 255, 255, 0.829)",
          }}
        >
          {/* <span className="filterCandidateLabel">
            {language.filterCandidateLabel[this.context.language]}
          </span> */}
          {/* <select className="questionsSelectBox" onChange={this.handleChange}>
            <option value="Select filter">Select filter</option>
            {this.state.filtersData &&
              React.Children.toArray(
                this.state.filtersData.map((filter) => (
                  <option value={filter}>{filter}</option>
                ))
              )}
          </select> */}
        </div>

        <form>
          <div className="formQuestions">
            {this.state.questions &&
              React.Children.toArray(
                this.state.filteredQuestions.map((question) => (
                  <QuestionsItem
                    question={question}
                    refreshQuestions={() => {
                      //   this.state.selectBox === "allQuestion"
                      //     ? this.allQuestions()
                      //     : this.FilterQuestions(this.state.selectBox);
                      this.FilterQuestions(this.context.school);
                    }}
                  />
                ))
              )}
          </div>
        </form>
      </div>
    );
  }
}

export default Questions;
