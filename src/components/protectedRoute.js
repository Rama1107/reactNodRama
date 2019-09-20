import React from 'react'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Link, Redirect, withRouter } from 'react-router-dom';
import { getAuth } from '../utils/access';

const ProtectedRoute = ({ component: Component, ...rest, }) => (
    <Route {...rest} render={(props) => (
        console.log('GAGAG = ', rest.isUserAuth),
        console.log(typeof rest.isUserAuth == 'string'),
        rest.isUserAuth ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />   
    )} />
);

export default ProtectedRoute;