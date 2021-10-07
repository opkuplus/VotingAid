import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import language from "../../properties/language";
import { UserContext } from '../../context/userContext';

class AdminNavbar extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            color: ''
        }
    }

    render() {
        return this.context.loggedIn && this.context.user === "Admin" &&
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#404040', color: '#FFFFFF', paddingLeft: 10, paddingRight: 10, fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h5 style={{ margin: 0 }}>{language.adminLogo[this.context.language]}</h5>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NavLink style={{ color: '#FFFFFF' }} to="/addCandidates" className="whiteFont"> {language.addCandidates[this.context.language]}</NavLink>
                    <NavLink style={{ color: '#FFFFFF' }} to="/addOneCandidate" className="whiteFont">  {language.addCandidate[this.context.language]} </NavLink>
                    <NavLink style={{ color: '#FFFFFF' }} to="/Candidates" className="whiteFont"> {language.browseCandidates[this.context.language]} </NavLink>
                    <NavLink style={{ color: '#FFFFFF' }} to="/addQuestion" className="whiteFont"> {language.addQuestion[this.context.language]} </NavLink>
                    <NavLink style={{ color: '#FFFFFF' }} to="/Questions" className="whiteFont"> {language.browseQuestions[this.context.language]} </NavLink>
                </div>
            </div>
    }
}

export default AdminNavbar;