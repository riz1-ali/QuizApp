import React, { Component } from 'react';
import './NewPerson.css';

class Logout extends Component {
  render(){
    localStorage.setItem("log_in",0);
    localStorage.setItem("admin",0);
    localStorage.setItem("id",0);
    localStorage.setItem("user","-");
    window.location.reload()
    return(
      <div>
      </div>
      );
  }
}
export default Logout;