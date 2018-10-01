import React, { Component } from 'react';
import './DeletePerson.css';

class EditQuestion extends Component {
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
      genre:"Sports",
      quiznum:"1",
      array_p: [],
      first_time: false ,
      emp: false
    }
    this.genchange = this.genchange.bind(this)
    this.submit = this.submit.bind(this)
    this.revokeSubmit = this.revokeSubmit.bind(this)
    this.quizchange = this.quizchange.bind(this)
    this.handleqChange = this.handleqChange.bind(this);
    this.handleaChange = this.handleaChange.bind(this);
    this.handlebChange = this.handlebChange.bind(this);
    this.handlecChange = this.handlecChange.bind(this);
    this.handledChange = this.handledChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
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
     this.setState({first_time: false});
     }
    });
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
    event.preventDefault();
    if(document.querySelector('input[name="optradio"]:checked')!==null){
      var ValueToSubmit = document.querySelector('input[name="optradio"]:checked').value;
      var url = 'http://127.0.0.1:8080/question/' + ValueToSubmit;
      fetch(url,{
        method: 'DELETE'
      })
      this.setState({first_time: true});
    }else{
      this.setState({emp: true});
    }
  }
  revokeSubmit(event){
    this.setState({emp: false});
  }

  render() {
    if(this.state.emp===true){
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
        )
    }else{
    if(this.state.first_time===false){
        return (
        <div className="App">
            <header className="App-header">
            <h1 className="App-title">Edit Question</h1>
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
        <button onClick={this.submit}>Submit</button>
        </div>
        );
      }else{
        return(
            <div className="App">
            <header className="App-header">
              <h1 className="App-title">Edit Question</h1>
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
            </div>
          );
      }
    }
  }
}
export default EditQuestion;
