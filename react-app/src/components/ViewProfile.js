import React, { Component } from 'react';
import './ViewPeople.css';

class ViewProfile extends Component{
    constructor(){
        super();
        this.state = {
            data: "",
            quiz: [],
            score_a: [],
        }
    }
    componentDidMount(){
        var url='http://127.0.0.1:8080/people/' + localStorage.getItem("id");
        const request = new Request(url);
        fetch(request)
            .then(response => response.json())
                .then(data => this.setState({data: data}));
        url='http://127.0.0.1:8080/retquizcount/' + localStorage.getItem("user");
        const request1 = new Request(url);
        fetch(request1)
            .then(response => response.json())
                .then(quiz => this.setState({quiz: quiz}));
        }
    render(){
        return(
            <div className="App">
        <header className="App-header">
          <h1 className="App-title">Profile:-{this.state.data.firstname} {this.state.data.lastname}</h1>
        </header>
        <h1>Username:-{this.state.data.username}</h1>
            <table className="table-hover">
              <thead>
                    <tr>
                        <th>Genre</th>
                        <th>Quiz Number</th>
                        <th>Number of Attempts</th>
                    </tr>
              </thead>
              <tbody>{this.state.quiz.map(function(item,key) {
                    return(
                    <tr>
                        <td>{item.genre}</td>
                        <td>{item.quiznum}</td>
                        <td>{item.attempt}</td>
                    </tr>
                )})}
                </tbody>
            </table>
      </div>
        );
    }
}

export default ViewProfile;