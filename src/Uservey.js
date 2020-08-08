import React, { Component } from "react";
var firebase = require("firebase");
var uuid = require("uuid");
var firebaseConfig = {
  apiKey: "AIzaSyD1S_rc2g6-9M8A3nF1rd1f8OCW6M4TUsc",
  authDomain: "usurvey-a2d81.firebaseapp.com",
  databaseURL: "https://usurvey-a2d81.firebaseio.com",
  projectId: "usurvey-a2d81",
  storageBucket: "usurvey-a2d81.appspot.com",
  messagingSenderId: "1039612046792",
  appId: "1:1039612046792:web:85b13b7f5a89db3d35e4fd",
  measurementId: "G-TBPP75BP8X",
};
firebase.initializeApp(firebaseConfig);

class Uservey extends Component {
  nameSubmit(event) {
    var studentName = this.refs.name.value;
    this.setState({ studentName: studentName }, function () {
      console.log(this.state);
    });
  }
  questionSubmit (event){
    firebase.database().ref('Uservey/'+this.state.uid).set({
      studentName :this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted:true});
  }
  answerSelected (event){

    var answers = this.state.answers;
    
    if (event.target.name == 'answer1' && this.state.studentName !== ''){
      answers.answer1 = event.target.value;

    } else if (event.target.name == 'answer2' && this.state.studentName !== ''){
      answers.answer2 = event.target.value;


  }if (event.target.name == 'answer3' && this.state.studentName !== ''){
    answers.answer3 = event.target.value;
  }
  this.setState ({answers: answers}, function(){
    console.log(this.state);
  });
}
 
  constructor(props) {
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: "",
      answers: {
        answer1: "",
        answer2: "",
        answer3: "",
      },
      isSubmitted: false,
    };

    this.nameSubmit = this.nameSubmit.bind(this);
    this.questionSubmit=this.questionSubmit.bind(this);  
    this.answerSelected = this.answerSelected.bind(this);
  }

  render() {
    var studentName;
    var questions;
    if (this.state.studentName === "" && this.state.isSubmitted === false) {
      studentName = (
        <div>
          <h1>Please let us know your name</h1>
          <form onSubmit={this.nameSubmit}>
            <input
              type="text"
              className="namy"
              ref="name"
              placeholder="Please inter your name here"
            />
          </form>
        </div>
      );
      questions = "";
    } else if (
      this.state.studentName !== "" &&
      this.state.isSubmitted === false
    ) {
      studentName = <h1>Hey Welcome to Uservey {this.state.studentName}</h1>;
      questions = (
        <div>
          <h2>Here are Some questions: </h2>
           <form onSubmit={this.questionSubmit}>       
          <div className="card">
            <label>What do you like to learn </label>
            Technology<input name="answer1" type="radio" onChange={this.answerSelected} value="technology" />
            
            Design<input name="answer1" type="radio" onChange={this.answerSelected} value="design" />
            
            Marketing<input name="answer1" type="radio" onChange={this.answerSelected} value="Marketing" />
            
          </div>
          <div className="card">
            <label>What are you: </label>
            student<input name="answer2" type="radio" onChange={this.answerSelected} value="student" />
            
            In a job<input name="answer2" type="radio" onChange={this.answerSelected} value="in-a-job" />
            
            Looking for a job<input name="answer2" type="radio" onChange={this.answerSelected} value="looking-job" />
            
          </div>
          <div className="card">
            <label>Do you like online Learning :</label>
            yes<input name="answer3" type="radio" onChange={this.answerSelected} value="yes" />
            
            No<input name="answer3" type="radio" onChange={this.answerSelected} value="no" />
            
            Maybe<input name="answer3" type="radio" onChange={this.answerSelected} value="may-be" />
            
          </div>
          <input type="submit" className="feedback-button" onChange={this.answerSelected} value="submit" />
          </form>
          </div>
          
      );
    }

    return (
      <div>
        {studentName}
        ------------------------------------------------------
        {questions}
      </div>
    );
  }
}

export default Uservey;
