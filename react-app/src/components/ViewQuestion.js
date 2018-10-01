import React, { Component } from 'react';
import './DeletePerson.css';

class ViewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      genre:"Sports",
      quiznum:"1",
      array_p: [],
      submitted: true ,
    }
    this.genchange = this.genchange.bind(this)
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View Question</h1>
        </header>
        <label>Genre</label><br></br>
            <select id="genre">
              <option value="Sports">Sports</option>
              <option value="TBD">TBD</option>
            </select><br></br>
         <label>Quiz Number</label><br></br>
          <select id="quiznum">
              <option value="1">Quiz1</option>
              <option value="2">Quiz2</option>
          </select><br></br>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th></th>
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
       <button onClick={this.genchange}>Change</button>
      </div>
    );
  }
}
export default ViewQuestion;
