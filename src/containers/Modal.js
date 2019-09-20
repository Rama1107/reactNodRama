import React, { Component } from "react";
import {withRouter} from 'react-router';
import { auth } from '../utils/api'
import { setToken } from '../utils/access';
import { connect }          from 'react-redux';
import firebase, {db} from "../components/firebase";
import {setAuth} from '../utils/access';
import {setUser} from '../store/actions';
import { weathet } from "../store/reducers";
import ProfilePage from "./imageUploader";

class Modals extends Component {

   constructor(props) {
      super(props);
      const self = this;

      this.state = {
         login: "",
         pwd: "",
         first_name: self.props.currentUseri.first_name,
         last_name: self.props.currentUseri.last_name,
         email: self.props.currentUseri.email,
      };
   }

   componentDidMount() {
      console.log('AAAAyy redux ======== ', this.props);
      const self = this;
      let users = [];
      setTimeout(()=> {
         console.log(this.props);
      }, 5000)
   }

   loadFile(e) {
      const file = e.target.files;
      this.fileProgress(file);
   }
   fileProgress(file) {
      console.log('FFFFFF');
      var reader = new FileReader ();
      reader.readAsDataUrl (file);
      reader.onprogress = function (progressEvent) {
         if (progressEvent.lengthComputable) {
            var stepLoaded = Math.round ((
                     progressEvent.loaded * 100) / progressEvent.total);
         }
         console.log ("total:" + progressEvent.total + ", загружено:"
                  + progressEvent.loaded + "("  + "%)");
      }
   }

   submit(event) {
      event.preventDefault();
      const self = this;
      let login = this.state.login
      let pwd   = this.state.pwd
      firebase.auth().signInWithEmailAndPassword(login, pwd).then(function() {
         setAuth(firebase.auth().currentUser.uid);
         console.log('AAAAAAAAAAAAAa');
         self.delUser();
      }).catch(function(error) {
         // Handle Errors here.
         setAuth(undefined);
         console.log(error.message);
      });
   }

   changeProfile(event) {
      event.preventDefault();
      const self = this;

      db.collection("users").doc(firebase.auth().currentUser.uid).set({
         uid: firebase.auth().currentUser.uid,
         first_name: self.state.first_name,
         last_name: self.state.last_name,
         email: self.state.email,
      })
      .then(function(docRef) {
         //self.props.history.push('/home');
         document.location.href = '/home';
         console.log("Document written with ID: ", firebase.auth().currentUser.uid);
      })
      .catch(function(error) {
         console.error("Error adding document: ", error);
      });
   }

   delUser() {
      const self = this;
      firebase.auth().currentUser.delete().then(function() {
         console.log('UUUUUUUUUU');
         //self.props.history.push('/login');
         document.location.href = '/login';
      }).catch(function(error) {
          console.log('EEEEEEEEE', error.message);
         // An error happened.
      });
      db.collection("users").doc(firebase.auth().currentUser.uid).delete().then(function() {
            console.log("Document successfully deleted!");
      }).catch(function(error) {
            console.error("Error removing document: ", error);
      });
     
   }

   loginChange(event) {
      this.setState({ login: event.target.value });
      console.log('cuuuuuuuuuuu ===== ', this.props.currentUseri.uid);
   }
   pwdChange(event) {
      this.setState({ pwd: event.target.value });
   }

   firstNChange(event) {
      this.setState({ first_name: event.target.value });
   }
   lastNChange(event) {
      this.setState({ last_name: event.target.value });
   }


   render() {
      return (  
         <page-modal>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{this.props.modalMessage}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {this.props.actionType == 'DeleteProfile' ? 
                           (<form onSubmit={e => this.submit(e)}>
                           <div className="col-md-12">
                                    <div className="form-group">
                                       <label for="exampleInputEmail1">Login</label>
                                       <input id="myInput" type="email" class="form-control" value={this.state.login}  onChange={e => this.loginChange(e)} className="form-control" placeholder="Login" required/>
                                    </div>
                                    <div className="form-group">
                                       <label for="exampleInputPassword1">Password</label>
                                       <input type="password" class="form-control" value={this.state.pwd} onChange={e => this.pwdChange(e)} className="form-control" placeholder="Password" required/>
                                    </div>
                                 </div>
                                 <div class="modal-footer">
                                       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                       <button type="submit" class="btn btn-primary">Login</button>
                                 </div>
                           </form>)
                           : ''}
                           {this.props.actionType == 'EditProfile' ? 
                           (<form onSubmit={e => this.changeProfile(e)}>
                           <div className="col-md-12">
                                    <div className="form-group">
                                       <label for="exampleInputEmail1">first name</label>
                                       <input id="myInput" type="text" class="form-control" value={this.state.first_name}  onChange={e => this.firstNChange(e)} className="form-control" placeholder="first name" required/>
                                    </div>
                                    <div className="form-group">
                                       <label for="exampleInputPassword1">last name</label>
                                       <input type="text" class="form-control" value={this.state.last_name} onChange={e => this.lastNChange(e)} className="form-control" placeholder="last name" required/>
                                    </div>
                                    <ProfilePage></ProfilePage>
                                 </div>
                                 <div class="modal-footer">
                                       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                       <button type="submit" class="btn btn-primary">Change</button>
                                 </div>
                           </form>) : ''
                        } 
                    </div>
                    </div>
                </div>
            </div>
         </page-modal>
      );
   }
}

const mapStateToProps = state => ({
   currentUseri: state.weathet.currentUseri
})

export default connect(mapStateToProps)(Modals);

// export default Modals;

