import React ,{Fragment}from 'react';
import Helmet from 'react-helmet'
import {Link} from "react-router-dom";
class Summary extends React.Component{
 constructor(props) {
  super(props)
 
  this.state = {
     score: 0,
     correctAnswers: 0,
     wrongAnswer: 0,
     numberOfAnsweredQuestion:0,
     numberofQuestion:0
  }
 }
componentDidMount (){
 const {state} = this.props.location;
 if(state){
 this.setState({
     score: state.score,
     correctAnswers: state.correctAnswers,
     wrongAnswer: state.wrongAnswer,
     numberOfAnsweredQuestion:state.numberOfAnsweredQuestion,
     numberofQuestion: state.numberOfQuestion
 })
 }
  
} 

render(){
 const {state} = this.props.location;
 
 let stats,remark;
 if(this.state.score<=30)
 {
  remark = 'you need to learn more';
 }
 else if(30<this.state.score<=50)
 {
  remark='Better luck next time!';
 }
 else if(50<this.state.score<=70) {
  remark='You can do better'
 }
 else{
  remark= 'Well Performed'
 }
 if(state !==undefined) 
 {
  stats =( 
   <Fragment>
   <div>
    <span></span>
   </div>
   <h2 id="top">Quiz ended</h2>
   <div className='container'>
    <h4>{`'${remark}'`}</h4>
    <h2  id='score'>Your Score: {this.state.score}%</h2>
    <span className="stat left">Total number of questions: </span>
    <span className="right">{state.numberOfQuestion}</span><br/>
    <span className="stat left">NUmber of correct answer: </span>
    <span className="right">{this.state.correctAnswers}</span><br/>
    <span className="stat left">Number of wrong answer: </span>
    <span className="right">{this.state.wrongAnswer}</span><br/>
    <span className="stat left">Total number of questions attempted: </span>
    <span className="right">{this.state.numberOfAnsweredQuestion}</span><br/>
   </div>
   <section id="section">
   <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/play/quiz">Quiz-again</Link></li>
   </ul>
   </section>
   </Fragment>
  )
 }
 else{
  stats = ( <section id='section'>
   <h2>Take a quiz</h2>
   <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/play/quiz">Quiz-again</Link></li>
   </ul>
   </section>) 
 }
 return (
  <Fragment>
   <Helmet><title>Summary</title></Helmet>
   {stats}
  </Fragment>
 )
}
}
export default Summary