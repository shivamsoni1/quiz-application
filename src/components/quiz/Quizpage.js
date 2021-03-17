import React,{Component,Fragment}  from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import isEmpty from '../../utils/is-Empty'
class Quizpage extends React.Component{
 constructor(props) {
  super(props)
 
  this.state = {
    questions:[],
    currentQuestion:{},
    nextQuestion:{},
    prevQuestion:{} ,
    answer:'',
    numberOfQuestion:0,
    numberOfAnsweredQuestion:0,
    currentQuestionIndex:0,
    score:0,
    correctAnswers:0,
    wrongAnswer:0,
    loading : false,
    prevDisable:true,
    nextDisable:false,
  }
   
 }
 handleButtonDisplay=()=>{
   if(this.state.prevQuestion === undefined || this.state.currentQuestionIndex ===0)
   {
     this.setState({
       prevDisable:true
     })
   }else{
     this.setState({
       prevDisable:false
     })
   }
   if(this.state.nextDisable === undefined || this.state.currentQuestionIndex+1 ===this.state.numberOfQuestion)
   {
     this.setState({
       nextDisable:true
     })
   }else{
     this.setState({
       nextDisable:false
     })
   }
 }
  async componentDidMount(){
  const url ='https://gist.githubusercontent.com/barman47/dbc4ecff10f9e07cfcda62d92e762c43/raw/cc25205b7ba0db8d5b40d4d97dd2a8d022cd5110/questions.json';
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  this.setState({questions: this.state.questions.concat(data)});
  console.log(this.state.questions);
  this.setState({loading: true,numberOfQuestion:this.state.questions.length});
  console.log(this.state.loading);
  const  { questions,currentQuestion,nextQuestion,prevQuestion }=this.state;
  this.questionRunning(questions,currentQuestion,nextQuestion,prevQuestion );
 }
 questionRunning =(questions = this.state.questions,currentQuestion,nextQuestion,prevQuestion )=>{
   let { currentQuestionIndex}= this.state;
   if(!isEmpty(this.state.questions)){ 
    questions= this.state.questions;
    currentQuestion= questions[currentQuestionIndex];
    nextQuestion = questions[currentQuestionIndex+1];
    prevQuestion = questions[currentQuestionIndex-1];
    const answer = currentQuestion.answer;
    this.setState({currentQuestion,nextQuestion,prevQuestion,answer},()=>{this.handleButtonDisplay();});
   }
 };
 clickoption=(e)=>{
   if(this.state.nextQuestion===undefined)
   {
     alert('quiz-end');
   }
   console.log((e.target.innerHTML.toLowerCase()));
  if(e.target.innerHTML.toLowerCase()=== this.state.answer.toLocaleLowerCase())
  {
    
    this.correct();
    
  }
  else{
    this.wrong();
    
  }
 }
 endQuiz = ()=>{
   const {state} =this;
   const Result ={
     score: Math.floor((state.score/state.numberOfQuestion)*100),
     correctAnswers:state.correctAnswers,
     wrongAnswer: state.wrongAnswer,
     numberOfAnsweredQuestion:state.numberOfAnsweredQuestion ,
     numberOfQuestion:state.numberOfQuestion
   }
   console.log(Result);
   setTimeout(()=>{
     this.props.history.push('/play/quiz/summary',Result);
   },100)
 }
 correct =()=>{
   
   this.setState(prevState=>({
     score: prevState.score +1,
     correctAnswers:prevState.correctAnswers +1,
     currentQuestionIndex:prevState.currentQuestionIndex +1,
     numberOfAnsweredQuestion:prevState.numberOfAnsweredQuestion +1,
   }),()=>{
    if(this.state.nextQuestion ===undefined){
      this.endQuiz();
    }else{
     this.questionRunning(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.prevQuestion)
    }
   })
 }
 wrong=()=>{
   this.setState(prevState=>({
     wrongAnswer:prevState.wrongAnswer +1,
     currentQuestionIndex:prevState.currentQuestionIndex +1,
     numberOfAnsweredQuestion:prevState.numberOfAnsweredQuestion +1,
   }),()=>{
     if(this.state.nextQuestion ===undefined){
      this.endQuiz();
    }else{
     this.questionRunning(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.prevQuestion)
    }
    })
 }
 nextButtonClick=()=>{
   if(this.state.nextQuestion !== undefined){
     this.setState(prevState=>({
       currentQuestionIndex: prevState.currentQuestionIndex+1
     }),()=>{
       this.questionRunning(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.prevQuestion)
     })
   }
 }
 prevButtonClick=()=>{
   if(this.state.prevQuestion !== undefined){
     this.setState(prevState=>({
       currentQuestionIndex: prevState.currentQuestionIndex-1
     }),()=>{
       this.questionRunning(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.prevQuestion)
     })
   }
 }
 buttonClick =(e)=>{
  switch(e.target.id){
    case 'next': 
      this.nextButtonClick();
      break;
    case 'prev': 
      this.prevButtonClick();
      break;
    default:break;
  }
 }
 
 render(){
   const {numberOfQuestion} = this.state;
 return(
   this.state.loading ?
   (<Fragment>
    <Helmet><title>Quiz page</title></Helmet> 
    <div className='question'>
     <h2>QUIZ</h2>
     <div className="lifeline-container">
      <p><span className='mdi mdi-set-center mdi-24px lifeline-icon'></span></p>
     </div>
     <div>
      <p id='number'>
       <span>{this.state.currentQuestionIndex+1} of {numberOfQuestion}</span>

      </p>
     </div>
     <h5><span>Q.{this.state.currentQuestionIndex+1} :</span>{this.state. currentQuestion.question}</h5>
     <div className='question-container'>
      
      <p onClick={this.clickoption} className='option'>{this.state. currentQuestion.optionA}</p>
      <p onClick={this.clickoption} className='option'>{this.state. currentQuestion.optionB}</p>
     </div>
     <div className='question-container'>
      <p onClick={this.clickoption} className='option'>{this.state. currentQuestion.optionC}</p>
      <p onClick={this.clickoption} className='option'>{this.state. currentQuestion.optionD}</p>
     </div>
     <div className="button-container">
      <button className={classNames('',{'disable':this.state.nextDisable})}
      id='next' onClick={this.buttonClick}>next</button>
      
     </div>
    </div>
   </Fragment>):( <div><h2>Loading...</h2></div>  )
  );
 }
}
export default Quizpage;