import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Link } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={10} category={"general"} country={"us"}/>
      </div>
    )
  }
}
