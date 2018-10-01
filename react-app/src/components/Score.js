import React, { Component } from 'react';
import './ViewPeople.css';

class Score extends Component{
    constructor() {
        super();
        this.state = {
            genre: "",
            quiznum: "",
            submitted: false,
            collision: false,
            array_p:[]
        }
        this.genchange = this.genchange.bind(this)
    }
    genchange(event){
        var e=document.getElementById("genre");
        this.setState({genre: e.options[e.selectedIndex].value});
        e=document.getElementById("quiznum");
        this.setState({quiznum: e.options[e.selectedIndex].value});
        var url='http://127.0.0.1:8080/score/'+
        this.state.genre+'/'+this.state.quiznum;
        const request = new Request(url);        
        fetch(request)
          .then(response => response.json())
            .then(array_p => this.setState({array_p: array_p}));
    }
    render() {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Score</h1>
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
            <table className="table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>UserName</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>{this.state.array_p.map(function(item,key) {
                   return (
                      <tr key = {key}>
                          <td>{item.id}</td>
                          <td>{item.username}</td>
                          <td>{item.score}</td>
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

export default Score;