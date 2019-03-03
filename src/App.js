import React, { Component } from 'react';
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import './App.css';


class App extends Component {
  constructor() {
    super();
  }




  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <ToDoList />
        </div>
      </div>
    );
  }
}

export default App;
