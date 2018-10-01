import React, { Component } from 'react';
import './DeletePerson.css';

class DeleteQuestion extends Component {
  constructor() {
    super();
    this.state = {
      genre:"Sports",
      quiznum:"1",
      array_p: [],
      submitted: true ,
      emp: false
    }
    this.genchange = this.genchange.bind(this);
    this.quizchange = this.quizchange.bind(this);
    this.submit = this.submit.bind(this);
    this.revokeSubmit = this.revokeSubmit.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quiz/'+this.state.genre+'/'+this.state.quiznum);
    fetch(request)
      .then(response => response.json())  
        .then(array_p => this.setState({array_p: array_p}));
    }
  genchange(event){
    var e=document.getElementById("genre");
    this.setState({genre: e.options[e.selectedIndex].value});
    e=document.getElementById("quiznum");
    this.setState({quiznum: e.options[e.selectedIndex].value});
    const request = new Request('http://127.0.0.1:8080/quiz/'+this.state.genre+'/'+this.state.quiznum);
    fetch(request)
      .then(response => response.json())
        .then(array_p => this.setState({array_p: array_p}));
  }
  quizchange(event){
    this.setState({quiznum: event.target.value});
    const request = new Request('http://127.0.0.1:8080/quiz/'+this.state.genre+'/'+this.state.quiznum);
    fetch(request)
      .then(response => response.json())
        .then(array_p => this.setState({array_p: array_p}));
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
            <h1 className="App-title">Delete Question</h1>
          </header>
          <label>Genre</label><br></br>
              <select id="genre">
                <option value="Sports">Sports</option>
                <option value="Movies">Movies</option>
              </select><br></br>
          <label>Quiz Number</label><br></br>
            <select id="quiznum">
                <option value="1">Quiz1</option>
                <option value="2">Quiz2</option>
            </select><br></br>
            <button onClick={this.genchange}>Change</button>
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>{this.state.array_p.map(function(item,key) {
                return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.question}</td>
                        <td><input type="radio" name="optradio" value={item.id}/></td>
                    </tr>
                  )
              })}
            </tbody>
        </table>
        <button onClick={this.submit}>Submit</button>
        </div>
      );
    }else{
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
export default DeleteQuestion;
