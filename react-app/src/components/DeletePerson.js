import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      submitted: true ,
      emp: false
      
    }
    this.submit = this.submit.bind(this);
    this.revokeSubmit = this.revokeSubmit.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  submit(event)
  {
    if(document.querySelector('input[name="optradio"]:checked')!==null){
      var ValueToSubmit = document.querySelector('input[name="optradio"]:checked').value;
      var url = 'http://127.0.0.1:8080/question/' + ValueToSubmit;
      fetch(url,{
        method: 'DELETE'
      })
      window.location.reload();
    }else{
      this.setState({emp: true});
    }
  }
  revokeSubmit(event){
    this.setState({emp: false});
  }

  render() {
    if(this.state.emp===false){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Delete People</h1>
          </header>
    
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>UserName</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
                return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.username}</td>
                        <td><input type="radio" name="optradio" value={item.id}/></td>
                    </tr>
                  )
              })}
            </tbody>
        </table>
        <button onClick={this.submit}>Submit</button>
        </div>
      );
    }
    else{
      return(
        <div className="App">
        <header className="App-header">
            <h1 className="App-title">Create Question</h1>
          </header>
          <br/><br/>
          <form onSubmit={this.revokeSubmit}>
            <h2>Please select a Radio Button.<br />Click on the button to return.</h2>
            <button type="submit" className="btn btn-default">Return</button>
          </form>
        </div>
        )}
  }
}
export default DeletePerson;
