import React, { Component } from 'react';
import './NewPerson.css';

class QuestionCreate extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre: "",
        quiznum: "",
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correcta: "",
        correctb: "",
        correctc: "",
        correctd: "",
      },
      submitted: false,
      collision: false,
      emp: false
    }
    this.handleqChange = this.handleqChange.bind(this);
    this.handleaChange = this.handleaChange.bind(this);
    this.handlebChange = this.handlebChange.bind(this);
    this.handlecChange = this.handlecChange.bind(this);
    this.handledChange = this.handledChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.revokeSubmit = this.revokeSubmit.bind(this);
    this.revoke = this.revoke.bind(this);
  }
  revoke(event){
    window.location.reload();
  }
  handleSubmit(event){
    var e=document.getElementById("quizno")
    this.state.formData.quiznum=e.options[e.selectedIndex].value
    e=document.getElementById("genre")
    this.state.formData.genre=e.options[e.selectedIndex].value
    if(document.getElementById("1").checked){
      this.state.formData.correcta=1
    }
    else{
      this.state.formData.correcta=0
    }
    if(document.getElementById("2").checked){
      this.state.formData.correctb=1
    }
    else{
      this.state.formData.correctb=0
    }
    if(document.getElementById("3").checked){
      this.state.formData.correctc=1
    }
    else{
      this.state.formData.correctc=0
    }
    if(document.getElementById("4").checked){
      this.state.formData.correctd=1
    }
    else{
      this.state.formData.correctd=0
    }
    event.preventDefault();
    fetch('http://localhost:8080/addques',{
        method: 'POST',
        body: JSON.stringify(this.state.formData),
    })
    .then(response => {
        if(this.state.formData.genre==="0" || this.state.formData.quiznum==="0"
         || this.state.formData.question==="" || (this.state.formData.correcta===0 && this.state.formData.correctb===0
          && this.state.formData.correctc===0 && this.state.formData.correctd===0)){
          this.setState({emp: true});
        }
        else{
        this.setState({submitted: true});
        }
    });
  }
  revokeSubmit(event){
    this.setState({emp: false});
  }
  handleqChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleaChange(event) {
    this.state.formData.a = event.target.value;
  }
  handlebChange(event) {
    this.state.formData.b = event.target.value;
  }
  handlecChange(event) {
    this.state.formData.c = event.target.value;
  }
  handledChange(event) {
    this.state.formData.d = event.target.value;
  }
  handleAChange(event) {
    this.state.formData.answer = event.target.value;
  }
  render(){
    if(this.state.emp==false){
      return(
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create Question</h1>
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
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleqChange}/>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input type="text" className="form-control" value={this.state.a} onChange={this.handleaChange}/>
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input type="text" className="form-control" value={this.state.b} onChange={this.handlebChange}/>
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input type="text" className="form-control" value={this.state.c} onChange={this.handlecChange}/>
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input type="text" className="form-control" value={this.state.d} onChange={this.handledChange}/>
            </div>
                <input type="checkbox" id="1" value="A"/>A
                <input type="checkbox" id="2" value="B"/>B
                <input type="checkbox" id="3" value="C"/>C
                <input type="checkbox" id="4" value="D"/>D
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        {
            this.state.submitted &&
            <div>
              <h2>
                New question successfully added.
                <form onSubmit={this.revoke}>
                <button type="submit" className="btn btn-default">Create New Question</button>
                </form>
              </h2>
            </div>
          }
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
          <h2>Please don't leave any necessary field empty.<br />Click on the button to return.</h2>
          <button type="submit" className="btn btn-default">Return</button>
        </form>
      </div>
      )}
  }
}
export default QuestionCreate;
