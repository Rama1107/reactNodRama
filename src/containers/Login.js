import React, { Component } from "react";
import {withRouter} from 'react-router';
import { auth } from '../utils/api'
import { setToken } from '../utils/access';
import { connect }          from 'react-redux';
import firebase from "../components/firebase";
import {setAuth} from '../utils/access';
import {setUser} from '../store/actions';
import { weathet } from "../store/reducers";
import $ from "jquery";

class Login extends Component {

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
      firebase.auth().signInWithEmailAndPassword(login, pwd).then(function() {
         setAuth(firebase.auth().currentUser.uid);
         document.location.href = '/home';
      }).catch(function(error) {
         // Handle Errors here.
         setAuth(undefined);
         self.setState({ error: error.message });
         $("#notification").css('opacity', '1');
         $("#notificationClose").on('click', () => {
            $("#notification").css('opacity', '0');
         });
      });
   }

   loginChange(event) {
      this.setState({ login: event.target.value });
   }

   pwdChange(event) {
      this.setState({ pwd: event.target.value });
   }


   render() {
      return (
         <page-login>   
            <div id="login" className="container padding-top">
            <div id="notification" class="alert alert-danger alert-dismissible fade show opacity0" role="alert">
               {this.state.error}
               <button id="notificationClose" type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div> 
               <form onSubmit={e => this.submit(e)} >
                  <div className="form-group">
                     <div className="row justify-content-md-center">
                        <div className="col-md-6 form-block">
                           <div className="container">
                              <div className="col-md-12">
                                 <div className="form-group">
                                    <label for="exampleInputEmail1">Login</label>
                                    <input type="email" class="form-control" value={this.state.login}  onChange={e => this.loginChange(e)} className="form-control" placeholder="Login" required/>
                                 </div>
                                 <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" value={this.state.pwd} onChange={e => this.pwdChange(e)} className="form-control" placeholder="Password" required/>
                                 </div><br/>
                                 <div className="form-group">
                                    <a href="/registration">
                                    Register
                                    </a>
                                 </div>
                              </div>
                           </div><br/>
                              <div className="col-md-12 padding-bottom">
                                 <button type="submit" className="btn btn-primary right">Submit</button>
                              </div>
                           </div>
                        </div>
                     </div>
               </form>
            </div>
         </page-login>
      );
   }
}

const mapStateToProps = state => ({
   currentUseri: state.weathet.currentUseri
})

export default connect(mapStateToProps)(Login);

//export default Login;

