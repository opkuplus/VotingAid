import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AdminRoute, CandidateRoute, PublicRoute } from './routeValidation.js';

//Components
import Form from '../containers/form';
import Home from '../containers/home';
import Registration from '../containers/registration';
import Login from '../containers/login';
import Profile from '../containers/profile';
import Candidates from '../containers/candidates';
import Questions from '../containers/questions';
import Suggestions from '../containers/suggestedCandidates';
import AddCandidates from '../containers/addCandidates';
import AddOneCandidate from '../containers/addOneCandidate';
import AddQuestion from '../containers/addQuestion';
import CandidateAnswers from '../containers/candidateAnswers';
import Navbar from "../components/navbar";
import AdminNavbar from '../components/adminNavbar';


const Navigation = () => {
    return <>
        <BrowserRouter>
            <div>
                <AdminNavbar />
                <Navbar />
                <Switch>
                    <AdminRoute path="/addQuestion" component={AddQuestion} />
                    <AdminRoute path="/addCandidates" component={AddCandidates} />
                    <AdminRoute path="/addOneCandidate" component={AddOneCandidate} />
                    <AdminRoute path="/Candidates" component={Candidates} />
                    <AdminRoute path="/Questions" component={Questions} />
                    <CandidateRoute path="/Profile" component={Profile} />
                    <Route path="/suggestedCandidates" component={Suggestions} />
                    <Route path="/candidateAnswers" component={CandidateAnswers} />
                    <Route path="/Form/:id" component={Form} />
                    <PublicRoute path="/Login" component={Login} />
                    <PublicRoute path="/Register" component={Registration} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    </>
}

export default Navigation;