import { Route, Redirect } from 'react-router-dom';
import jwt from 'jwt-decode'

// Simple Auth check with out token just to stop us to navigate in any private route
export const CandidateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // Here need to check if Token exist because is unsecure
        getLoginStatus() === "Candidate" ||
            getLoginStatus() === "Admin" // TODO: TOKEN
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/Login',
                state: { from: props.location }
            }} />
    )} />
)

// Simple Auth check with out token just to stop us to navigate in any private route
export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // Here need to check if Token exist because is unsecure
        getLoginStatus() === "Admin" // TODO: TOKEN
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/Login',
                state: { from: props.location }
            }} />
    )} />
)

// Simple Auth check with out token just to stop us to navigate in any private route
export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // Here need to check if Token exist because is unsecure
        !getLoginStatus() // TODO: TOKEN
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/Login',
                state: { from: props.location }
            }} />
    )} />
)

const getLoginStatus = () => {
    const storedToken = sessionStorage.getItem("token")
    const decodedToken = storedToken ? jwt(storedToken) : ''
    console.log(decodedToken);
    return decodedToken.status;
}