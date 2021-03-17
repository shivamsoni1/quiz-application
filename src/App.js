import React from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Home from './components/Home';
import Quizpage from './components/quiz/Quizpage';
import Summary from './components/quiz/Summary'
function App() {
  return (
    <Router>
      <Route path='/' exact component={Home}/>
      <Route path='/play/quiz' exact component={Quizpage} /> 
      <Route path='/play/quiz/summary' exact component={Summary} /> 
    </Router>
  );
}

export default App;
