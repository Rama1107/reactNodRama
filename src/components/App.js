import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Link, Redirect, withRouter } from 'react-router-dom';
import Home from "../containers/Home";
import Login from "../containers/Login";
import Registration from "../containers/Registration";
import firebase from "../components/firebase"
// import addMessage, {admin} from "../components/firebaseFunctions"
import { connect } from 'react-redux';
import ProtectedRoute from '../components/protectedRoute'
import {getAuth, setAuth, delAuth} from '../utils/access';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css'
import {setUser} from '../store/actions';

class App extends Component {

  constructor(props) {
     super(props);

     this.state = {
      isUserAuth: getAuth(),
      protectedRouter: ProtectedRoute,
    };
  }

  componentDidMount() {
      const self = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setAuth(firebase.auth().currentUser.uid);
          self.setState({isUserAuth: firebase.auth().currentUser.uid});
          self.props.dispatch(setUser(firebase.auth().currentUser.uid));
        } else {
          setAuth(undefined);
          self.setState({isUserAuth: undefined});
        }
      });
  }

  render() {
    const self = this;
    const WrappedLogin = function(props) {
      return (<Login {...props} />);
    };
    const WrappedRegistration = function(props) {
      return (<Registration {...props} />);
    };
    const WrappedHome = function(props) {
      return (<Home {...props} isUserAuth={self.state.isUserAuth}/>);
    };
    console.log(this.state.isUserAuth);
    
    return(
        <Router>
          <div className="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <a className="navbar-brand" href="#">My React</a>
          </nav>
            <Switch>
                <Route exact path="/login" component={WrappedLogin} />
                <Route path="/registration" component={WrappedRegistration} />
                <ProtectedRoute path="/home" component={WrappedHome} isUserAuth={self.state.isUserAuth} />
            </Switch>
          </div>
        </Router>
      
    );
  }
}

const mapStateToProps = state => ({
  currentUseri: state.weathet.currentUseri
})

export default connect(mapStateToProps)(App);
//export default App;

