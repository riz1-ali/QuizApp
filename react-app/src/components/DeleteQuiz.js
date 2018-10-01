import React, { Component } from 'react';
import './NewPerson.css';

class DeleteQuiz extends Component {
    constructor() {
        super();
        this.state = {
          formData: {
            genre: "",
            quiznum: "",
          },
          submitted: false,
          collision: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        var e=document.getElementById("quizno");
        this.state.formData.quiznum=e.options[e.selectedIndex].value;
        e=document.getElementById("genre");
        this.state.formData.genre=e.options[e.selectedIndex].value;
        var url='http://127.0.0.1:8080/quiz/'+
        this.state.formData.genre+'/'+this.state.formData.quiznum;
        fetch(url,{method:'DELETE'})
        .then(response => {
            if(response.status >= 200 && response.status < 300){
              this.setState({submitted: true});
              window.location.reload()
            }
            else{
            this.setState({collision: true});
            }
        });
    }

    render(){
        return(
          <div className="App">
          <header className="App-header">
            <h1 className="App-title">Delete Quiz</h1>
          </header>
          <br/><br/>
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                  <label>Genre</label><br></br>
                  <select id="genre">
                    <option value="Sports">Sports</option>
                    <option value="Movies">Movies</option>
                  </select>
              </div>
              <div className="form-group">
              <label>Quiz Number</label><br></br>
                <select id="quizno">
                  <option value="1">Quiz1</option>
                  <option value="2">Quiz2</option>
                </select>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
          {
              this.state.submitted &&
              <div>
                <h2>
                    Deletion Successful
                </h2>
              </div>
            }
          </div>
        );
    }
}
export default DeleteQuiz;