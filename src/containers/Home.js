import React, { Component } from "react";
import { connect }          from 'react-redux'
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom'
import { delToken, getAuth, delAuth, getToken } from '../utils/access'
import firebase, {db} from "../components/firebase"
import $ from "jquery";
import Modals from "./Modal";
require("firebase/functions");

class Home extends Component {

   constructor(props) {
      super(props);
      this.state = {
         currentUser: {first_name: null, last_name: null, uid: getAuth()},
         users: null,
         curMessage: '',
         companionСurMessage: {text: ''},
         setUserToMessage: false,
         actionType: null,
         modalMessage: '',
         downloadUrl: '',
      }
      // this.setState({currentUser:{...this.state.currentUser, last_name:"sadjkfh"}})
   }

   last_nameChange(event) {
      let user = {first_name: this.state.realTimeData.first_name, last_name: event.target.value, uid: this.state.realTimeData.uid};
      this.setState({ realTimeData: user });
      this.writeUserData(user);
   }
   nameChange(event) {
      let user = {first_name: event.target.value, last_name: this.state.realTimeData.last_name, uid: this.state.realTimeData.uid};
      this.setState({ realTimeData: user });
      this.writeUserData(user);
   }
   messageChange(e) {
      const self = this;
      let user = this.state.currentUser;
      this.setState({ curMessage: e.target.value });
      let text = e.target.value;
      firebase.database().ref('messages/' + user.uid + this.state.setUserToMessage).set({
         text: text,
      });
   }

   setUserToMessage(e) {
      const self = this;
      this.setState({setUserToMessage: e.target.value}, 
         () => {
            var componionMessageRef = firebase.database().ref('messages/' + this.state.setUserToMessage + this.state.currentUser.uid);
            componionMessageRef.on('value', function(snapshot) {
               if (snapshot.val()) {
                  self.setState({ companionСurMessage: snapshot.val()});
                  $("#notification").show();
               } else {
                  self.setState({ companionСurMessage: {text: ''}});
               }
            });

            var myMessageRef = firebase.database().ref('messages/' + this.state.currentUser.uid + this.state.setUserToMessage);
            myMessageRef.on('value', function(snapshot) {
               if (snapshot.val()) {
                  self.setState({ curMessage: snapshot.val().text});
               } else {
                  self.setState({ curMessage: ''});
               }
            });
         }
      );
    }
   //  sendMessage() {
   //    var addMessage = firebase.functions().httpsCallable('addMessage');
   //    addMessage({text: this.state.curMessage}).then(function(result) {
   //       //self.setState({realTimeData: result.data.user});
   //       console.log('SEND MESSAGE!');
   //    }).catch(function(error) {
   //       console.log(error.message);
   //    });
   //  }
   actionType() {
      const self = this;
      $("#DeleteProfile").on('click', function() {
         self.setState({actionType: 'DeleteProfile', modalMessage: 'To delete Account please reautorizate'});
      });
      $("#EditProfile").on('click', function() {
         self.setState({actionType: 'EditProfile', modalMessage: 'Edit your profile'});
      });
   }
  
   componentDidMount() {
      const self = this;
      let users = [];
      db.collection("users").where('uid', '==', this.props.isUserAuth).get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            self.setState({currentUser: doc.data()});
         });
         // var starCountRef = firebase.database().ref('users/' + self.state.currentUser.uid + '/user');
         // starCountRef.on('value', function(snapshot) {
         //    console.log('ADSSADSDSDSD', snapshot.val());
         //    if (snapshot.val()) {
         //       self.setState({ realTimeData: snapshot.val()});
         //    }
         // });
      });
      db.collection("users").get().then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            users.push(doc.data());
         });
         self.setState({users: users});
      });
      firebase.storage().ref().child('mountains.jpg').child("0930f72d-eae6-4732-a273-c32334c942a6.png").getDownloadURL().then(function(url) {
         self.setState({downloadUrl: url});
       }).catch(function(error) {
         // Handle any errors
       });
   }

   exit(e) {
      delToken()
      delAuth();
      firebase.auth().signOut().then(function() {
         console.log('Sign-out successful');
      }).catch(function(error) {
         console.log('An error happened');
      });
      this.props.history.push('/login');
   }

   render() {
      return (
         <page-home> 
            <div className="bar mt-4">
               <div className="row form-block justify-content-end">
                  <div className="col-md-1">
                     <div onClick={e => this.exit(e)}>
                        <Link to="/login" className="btn btn-primary right">Exit</Link>
                     </div>
                  </div>
               </div>
            </div>     
            <div className="container padding-top">
               <div id="header" className="startBlock">
               <div className="logo">
                  <p>User</p>
               </div>
            </div>
            </div>
            <table className="table">
            <thead>
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Имя</th>
                  <th scope="col">Фамилия</th>
                  <th scope="col">email </th>
                  <th scope="col">Actions</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <th scope="row">1</th>
                  <td>{this.props.currentUseri ? this.props.currentUseri.first_name : ''}</td>
                  <td>{this.props.currentUseri ? this.props.currentUseri.last_name : ''}</td>
                  <td>{this.props.currentUseri ? this.props.currentUseri.email : ''}</td>
                  <td>
                     <button id="DeleteProfile" onClick={this.actionType()} data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" type="button" className="btn btn-outline-danger btn-sm">&times;</button>
                     &nbsp;<button id="EditProfile" onClick={this.actionType()} data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" type="button" className="btn btn-outline-primary btn-sm">&#9998;</button></td>
                    
               </tr>
            </tbody>
            </table>
            <img src={this.state.downloadUrl}></img>
            

            <Modals actionType={this.state.actionType} modalMessage={this.state.modalMessage}></Modals>
         


            {this.state.users ? 
               (<div className="form-group mt-4">
                  <div className="row justify-content-md-center">
                  <div className="col-md-6 form-block">
                     <div className="input-group mb-3">
                        <input type="text" className="form-control" value={this.state.companionСurMessage.text} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" readOnly/>
                     </div>
                     <div className="input-group mb-3">
                        <input type="text" className="form-control" value={this.state.curMessage} onChange={e => this.messageChange(e)} disabled={this.state.setUserToMessage == false || this.state.setUserToMessage == 'false'} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                        <button className="input-group-text" id="basic-addon2" onClick={() => this.sendMessage()}>Send</button>
                        </div>
                     </div>
                     <select onChange={(e) => {this.setUserToMessage(e)}} className="custom-select" id="inputGroupSelect01">
                           <option value={false} defaultValue>Choose...</option>
                           {
                              this.state.users.map(user => (
                              <option key={user.uid} value={user.uid}>{user.first_name + ' ' + user.last_name} </option>
                           ))}
                     </select>
                  </div>
                  </div>
               </div>) 
               : '' 
            }  
         </page-home>
      );
   }
}
               
const mapStateToProps = state => ({
   currentUseri: state.weathet.currentUseri
})

export default connect(mapStateToProps)(Home);
// export default Home;


