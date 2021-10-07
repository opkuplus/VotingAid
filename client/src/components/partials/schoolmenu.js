import React, { Component } from 'react';
import axios from "axios";

class Schoolmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      value: 'Laurea'
    };
  }

  handleChange() {
    this.setState({ value: this.refs.campus.value });
  }

  componentDidMount() {
    axios.get('/')
      .then(res => {
        let s = [];
        for (var i = 0; i < res.data.length; i++) {
          s.push(res.data[i].school);
        }
        const uniqueSchools = Array.from(new Set(s));
        this.setState({ schools: uniqueSchools });
      });
  }

  render() {
    return (
      <select ref="campus" onChange={this.handleChange.bind(this)}>
        {this.state.schools.map(index => {
          return (
            <option value={index}>{index}</option>
          );
        }
        )}
      </select>
    );
  }
}

export default Schoolmenu;