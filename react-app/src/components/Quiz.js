import React, { Component } from 'react';
import './NewPerson.css';

class Quiz extends Component {
    constructor() {
        super();
        this.state = {
          formData:{
            username:"",
            genre: "",
            quiznum: "",
            score: 0,
          },
          quizData:{
            username:"",
            genre: "",
            quiznum: "",
            score: 0,
            attempted: 1,
          },
            genre: "",
            quiznum: "",
            score: 0,
          array_p: [],
          submitted: 0,
          success: false,
          life: false,
        }
        this.lifeline = this.lifeline.bind(this);
        this.reSubmit = this.reSubmit.bind(this);
        this.ansSubmit = this.ansSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    lifeline(event){
      this.setState({life:true});
      this.setState({submitted:1});
    }
    reSubmit(event){
      event.preventDefault();
      this.state.quizData.genre=this.state.genre;
      this.state.quizData.quiznum=this.state.quiznum;
      this.state.quizData.score=this.state.score;
      this.state.quizData.username=localStorage.getItem("user")
      fetch('http://localhost:8080/quizcount', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({success: true});
        }
        else{
        this.setState({collision: true});
        }
      });
      this.setState({submitted:0});
    }
    ansSubmit(event){
      event.preventDefault();
      this.state.score=0;
      var flag;
      var xA=document.getElementsByClassName("1")
      var xB=document.getElementsByClassName("2")
      var xC=document.getElementsByClassName("3")
      var xD=document.getElementsByClassName("4")
      for(var i=0;i<this.state.array_p.length;i++){
        flag=0;
        if(this.state.array_p[i].correcta===1){
          if(xA[i].checked){
            flag=1
          }else{
            continue;
          }
        }else{
          if(xA[i].checked){
            continue;
          }else{
            flag=1;
          }
        }
        if(this.state.array_p[i].correctb===1){
          if(xB[i].checked){
            flag=1
          }else{
            continue;
          }
        }else{
          if(xB[i].checked){
            continue;
          }else{
            flag=1;
          }
        }
        if(this.state.array_p[i].correctc===1){
          if(xC[i].checked){
            flag=1
          }else{
            continue;
          }
        }else{
          if(xC[i].checked){
            continue;
          }else{
            flag=1;
          }
        }
        if(this.state.array_p[i].correctd===1){
          if(xD[i].checked){
            flag=1
          }else{
            continue;
          }
        }else{
          if(xD[i].checked){
            continue;
          }else{
            flag=1;
          }
        }
        if(flag==1){
          this.state.score+=10;
        }
      }
      this.state.formData.score=this.state.score;
      this.state.formData.genre=this.state.genre;
      this.state.formData.quiznum=this.state.quiznum;
      this.state.formData.username=localStorage.getItem("user")
      fetch('http://localhost:8080/score', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({success: true});
        }
        else{
        this.setState({collision: true});
        }
      });
      this.setState({submitted:2});
    }
    handleSubmit(event){
      event.preventDefault();
     var e=document.getElementById("genre");
      this.setState({genre:e.options[e.selectedIndex].value});
      e=document.getElementById("quiznum");
      this.setState({quiznum:e.options[e.selectedIndex].value});
      var url='http://127.0.0.1:8080/quiz/'+
        this.state.genre+'/'+this.state.quiznum;
        const request = new Request(url);        
        fetch(request)
        .then(response => response.json())
        .then(array_p => {
          this.setState({array_p:array_p})
          for(var i = 0;i<array_p.length;i++)
          {
            this.setState({submitted:1});
            break;
          }
        })
    }
  render(){
    if (this.state.submitted===0){
      return(
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
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
             <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>
      </div>
        );
      }else if(this.state.submitted===1 && this.state.life===true){
      return(
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.genre+' Quiz-'+this.state.quiznum}</h1>
        </header>
        <br/><br/>
        <form onSubmit={this.ansSubmit}>
        {this.state.array_p.map(function(item, key) {
          return (
            <p id={item.id}>
                <h2>Question-:{item.question}</h2>
                <input type="checkbox" className="1" value="A"/>{item.a}<br></br>
                <input type="checkbox" className="2" value="B"/>{item.b}<br></br>
                <input type="checkbox" className="3" value="C"/>{item.c}<br></br>
                <input type="checkbox" className="4" value="D"/>{item.d}<br></br>
                <h2>{(item.correcta===1 || item.correctb===1 || item.correctc===1 || item.correctd===1) && 'Answer:-'}
                {item.correcta===1 && 'A'}{item.correctb===1 && 'B'}
                {item.correctc===1 && 'C'}{item.correctd===1 && 'D'}</h2>
            </p>
           )
        })}
        <button type="submit" className="btn btn-default">Submit</button>
        </form>
        </div>
      );
    }else if(this.state.submitted===1 && this.state.life===false){
      return(
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.genre+' Quiz-'+this.state.quiznum}</h1>
        </header>
        <br/><br/>
        <form onSubmit={this.ansSubmit}>
        {this.state.array_p.map(function(item, key) {
          return (
            <p id={item.id}>
                <h2>Question-:{item.question}</h2>
                <input type="checkbox" className="1" value="A"/>{item.a}<br></br>
                <input type="checkbox" className="2" value="B"/>{item.b}<br></br>
                <input type="checkbox" className="3" value="C"/>{item.c}<br></br>
                <input type="checkbox" className="4" value="D"/>{item.d}<br></br>
            </p>
           )
        })}
        <button type="submit" className="btn btn-default">Submit</button>
        </form>
        <form onSubmit={this.lifeline}><button type="submit" >Life</button></form>
        </div>
      );
    }else{
      return(
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.genre+' Quiz-'+this.state.quiznum}</h1>
        </header>
        <br/><br/>
        <form onSubmit={this.reSubmit}>
        <h2>Your Score is : {this.state.score}</h2>
        <button type="submit" className="btn btn-default">Return</button>
        </form>
        </div>
      );
    }
  }
}
export default Quiz;