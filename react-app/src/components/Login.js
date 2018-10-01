import React, { Component } from 'react';
import './NewPerson.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: "",
      },
      array_p: [],
      submitted: false,
      try:true,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    if(this.state.formData.username==="" || this.state.formData.password===""){
      this.setState({try:false});
    }else{
      this.setState({try:true});
      event.preventDefault();
      const request = new Request("http://127.0.0.1:8080/people/");
      fetch(request)
        .then(response => response.json())
          .then(array_p => {
            this.setState({array_p:array_p})
            for(var i = 0;i<array_p.length;i++)
            {
              if(array_p[i].username === this.state.formData.username && array_p[i].password === this.state.formData.password)
              {
                localStorage.setItem("log_in",1);
                localStorage.setItem("user",this.state.formData.username);
                localStorage.setItem("id",array_p[i].id)
                if(array_p[i].superuser === 1){
                  localStorage.setItem("admin",1)
                }
                else{
                  localStorage.setItem("admin",0)
                }
                this.setState({submitted :true})
                window.location.reload();
                break;
              }
            }
          })
    }
  }

  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }
  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>UserName</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="text" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        {!this.state.try && <h2>Don't leave the fields empty.</h2>}
      </div>
    );
  }
}	

export default Login;
