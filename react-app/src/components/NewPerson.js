import React, { Component } from 'react';
import './NewPerson.css';

class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        superuser: ""
      },
      submitted: false,
      collision: false,
      empty: true,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    if(this.state.formData.firstName==="" || this.state.formData.lastName==="" || this.state.formData.username==="" 
    || this.state.formData.password===""){
      this.setState({empty:false});
    }else{
      this.setState({empty:true});
    this.state.formData.superuser=document.querySelector('input[name="rad"]:checked').value
    event.preventDefault();
    fetch('http://localhost:8080/signup', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
        }
        else{
        this.setState({collision: true});
        }
      });
    }
  }

  handleFChange(event) {
    this.state.formData.firstName = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.lastName = event.target.value;
  }
  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Person</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleLChange}/>
            </div>
            <div className="form-group">
                <label>UserName</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="text" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
            <label>Admin Access</label><br></br>
              <input type="radio" name="rad" value="1"/>Yes
              <input type="radio" name="rad" value="0"/>No
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        {
          this.state.collision &&
          <div>
            <h2>
              UserName already taken
            </h2>
          </div>
        }
        {
          this.state.submitted &&
          <div>
            <h2>
              New person successfully added.
            </h2>
          </div>
        }
        {!this.state.empty && <h2>Don't leave the fields empty.</h2>}
      </div>
    );
  }
}

export default NewPerson;
