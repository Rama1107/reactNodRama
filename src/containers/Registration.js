import React, { Component } from "react";
import {withRouter} from 'react-router';
import { registration } from '../utils/api'
import { setToken } from '../utils/access';
import { connect }          from 'react-redux'
import firebase, {db} from "../components/firebase";
import {setAuth} from "../utils/access";
import $ from "jquery";

class Registration extends Component {

   constructor(props) {
      super(props);

      this.state = {
         login: "",
         pwd: "",
         error: "",
      };
   }

   submit(event) {
      event.preventDefault();
      const self = this;
      let login = this.state.login
      let pwd   = this.state.pwd
      let first_name = this.state.name
      let last_name   = this.state.last_name

      firebase.auth().createUserWithEmailAndPassword(login, pwd).then(function() {
         setAuth(firebase.auth().currentUser.uid);
         db.collection("users").doc(firebase.auth().currentUser.uid).set({
            uid: firebase.auth().currentUser.uid,
            first_name: first_name,
            last_name: last_name,
            email: login,
         })
         .then(function(docRef) {
            self.props.history.push('/home');
            console.log("Document written with ID: ", firebase.auth().currentUser.uid);
         })
         .catch(function(error) {
            console.error("Error adding document: ", error);
         });
      }).catch(function(error) {
         setAuth(undefined);
         self.setState({ error: error.message });
         $("#notification").css('opacity', '1');
         $("#notificationClose").on('click', () => {
            $("#notification").css('opacity', '0');
         });
         console.log('ERROR: ', error.message);
      });
   }

   loginChange(event) {
      this.setState({ login: event.target.value });
   }

   pwdChange(event) {
      this.setState({ pwd: event.target.value });
   }
   last_nameChange(event) {
      this.setState({ last_name: event.target.value });
   }
   nameChange(event) {
      this.setState({ name: event.target.value });
   }


   render() {
      return (
         <page-registration>      
            <div id="registration" className="container padding-top">
            <div id="notification" class="alert alert-danger alert-dismissible fade show opacity0" role="alert">
               {this.state.error}
               <button id="notificationClose" type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div> 
               <form onSubmit={e => this.submit(e)} >
                  <div className="row justify-content-md-center">
                     <div className="col-md-6 form-block">
                        <div className="container">
                           <div className="col-md-12">
                           <div className="form-group">
                                 <label for="exampleInputEmail1">First name</label>
                                 <input type="text" value={this.state.name}  onChange={e => this.nameChange(e)} className="form-control" placeholder="First name"/>
                              </div>
                              <div className="form-group">
                                 <label for="exampleInputPassword1">Last name</label>
                                 <input type="text" value={this.state.last_name} onChange={e => this.last_nameChange(e)} className="form-control" placeholder="Last name"/>
                              </div>
                              <div className="form-group">
                                 <label for="exampleInputEmail1">Login</label>
                                 <input type="email" value={this.state.login}  onChange={e => this.loginChange(e)} className="form-control" placeholder="Email" required/>
                              </div>
                              <div className="form-group">
                                 <label for="exampleInputPassword1">Password</label>
                                 <input type="password" value={this.state.pwd} onChange={e => this.pwdChange(e)} className="form-control" placeholder="Password" required/>
                              </div>
                              <div className="form-group">
                                 <a href="/login">
                                 Login
                                 </a>
                              </div>
                           </div>
                        </div>
                           <div className="col-md-12 padding-bottom">
                              <button type="submit" className="btn btn-primary right">Submit</button>
                           </div>
                        </div>
                     </div>
               </form>
            </div>
         </page-registration>
      );
   }
}

export default Registration;

