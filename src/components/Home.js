import React ,{Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
const Home = ()=>{
 return(
  <Fragment>
   <Helmet>
    <title>
     Quiz App-Home
    </title>
   </Helmet>
    <div id='home'>
     <section>
       <div>
        <span className="mdi mdi-cube-outline mdi-48px"></span>
       </div>
       <h1>Quiz App</h1>
       <div id= "play-button-container">
        <ul>
         <li ><Link to = "/play/quiz" className='play-button'>Start Quiz</Link></li>
        </ul>
       </div>
       <div className="auth-container">
        <Link to="/login" className='auth-button' id='login-button'>Login</Link>
        <Link to="/signUp" className='auth-button' id='signUp-button'>Register</Link>
       </div>
     </section>
    </div>
  </Fragment>
  
 );
};
export default Home;