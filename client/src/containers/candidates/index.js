import React, { Component } from 'react';
import { SetCandidateTable, FilterCandidateTable } from '../../functions/dbCalls';
import { QuestionAreaList } from '../../components/partials/selectMenuLists'
import SelectMenu from '../../components/partials/selectMenu.js';
import CandidateTable from '../../components/partials/candidateTable';
import language from "../../properties/language";
import { UserContext } from '../../context/userContext';

class Candidates extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      amount: [],
      Association: [],
      theme: this.props.theme,
      filtered: false,
    }
  }

  SetStateArray = (stateArray, value) => {
    console.log(value)
    console.log(stateArray)
    this.setState({ [stateArray]: value });
  }

  componentDidMount() {
    FilterCandidateTable(this.SetStateArray, this.context.school);
  }

  render() {
    return (
      <div style={{ width: '50%', marginLeft: '25%', marginTop: '5%' }}>
        {/* <label htmlFor="school" className="filterCandidateLabel"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.829)', width: '50%', marginTop: '5%',
            marginLeft: '18%'
          }}
        >{language.filterCandidateLabel[this.context.language]}</label>
        <SelectMenu
          className={'studentAssociationList'}
          selectMenuList={QuestionAreaList}
          action={this.handleChange.bind(this)}
        />
        {console.log(this.state.amount)} */}
        <CandidateTable
          stateArray={this.state} counter={-1}
          candidateDeleted={() => {
            console.log('Got event')
            FilterCandidateTable(this.SetStateArray, this.context.school);
          }}
        />
      </div>
    );
  }
}
export default Candidates;