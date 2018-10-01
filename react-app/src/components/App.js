import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import NewPerson from './NewPerson';
import Login from './Login';
import Home from './Home';
import Logout from './Logout';
import QuestionCreate from './CreateQuestion'
import DeleteQuestion from './DeleteQuestion'
import EditQuestion from './EditQuestion'
import ViewProfile from './ViewProfile'
import Quiz from './Quiz'
import DeleteQuiz from './DeleteQuiz'
import Score from './Score'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class App extends Component {
  render() {
      if(localStorage.getItem("log_in")==="1" && localStorage.getItem("admin")==="1"){
        return(
          <div>
              <Router>
                <div>
                  <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <Link className="navbar-brand" to={'/'}>QuizApp</Link>
                      </div>
                      <ul className="nav navbar-nav">
                        <li><Link to={'/ViewPeople'}>View People</Link></li>
                        <li><Link to={'Quiz'}>Quiz</Link></li>
                        <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                        <li><Link to={'/QuestionCreate'}>Create Question</Link></li>
                        <li><Link to={'/DeleteQuestion'}>Delete Question</Link></li>
                        <li><Link to={'/EditQuestion'}>Edit Question</Link></li>
                        <li><Link to={'/DeleteQuiz'}>Delete Quiz</Link></li>
                        <li><Link to={'/ViewProfile'}>View Profile</Link></li>
                        <li><Link to={'/Score'}>View Score</Link></li>
                        <li><Link to={'/Logout'}>Logout</Link></li>
                      </ul>
                    </div>
                  </nav>
                  <Switch>
                      <Route exact path='/ViewPeople' component={ViewPeople} />
                      <Route exact path='/DeletePerson' component={DeletePerson} />
                      <Route exact path='/Logout' component={Logout} />
                      <Route exact path='/EditQuestion' component={EditQuestion} />
                      <Route exact path='/QuestionCreate' component={QuestionCreate} />
                      <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                      <Route exact path='/Quiz' component={Quiz} />
                      <Route exact path='/ViewProfile' component={ViewProfile} />
                      <Route exact path='/Score' component={Score} />
                      <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                  </Switch>
                </div>
              </Router>
            </div>
          );
    }else if(localStorage.getItem("log_in")==="1"){
      return(
        <div>
            <Router>
              <div>
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <Link className="navbar-brand" to={'/'}>QuizApp</Link>
                    </div>
                    <ul className="nav navbar-nav">
                      <li><Link to={'/ViewPeople'}>View People</Link></li>
                      <li><Link to={'Quiz'}>Quiz</Link></li>
                      <li><Link to={'/ViewProfile'}>View Profile</Link></li>
                      <li><Link to={'/Score'}>View Score</Link></li>
                      <li><Link to={'/Logout'}>Logout</Link></li>
                    </ul>
                  </div>
                </nav>
                <Switch>
                    <Route exact path='/ViewPeople' component={ViewPeople} />
                    <Route exact path='/Quiz' component={Quiz} />
                    <Route exact path='/ViewProfile' component={ViewProfile} />
                    <Route exact path='/Score' component={Score} />
                    <Route exact path='/Logout' component={Logout} />
                </Switch>
              </div>
            </Router>
          </div>
        );
    }else{
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>QuizApp</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/NewPerson'}>SignUp</Link></li>
                    <li><Link to={'/Login'}>Login</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/NewPerson' component={NewPerson} />
                  <Route exact path='/Login' component={Login} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }
}
export default App;
