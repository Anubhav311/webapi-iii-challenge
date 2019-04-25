import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Users from './components/users';
import User from './components/user';

import './App.css'; 

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Users}/>
      <Route path="/api/users/:id" component={User}/>
    </div>
  );
}

export default App;
