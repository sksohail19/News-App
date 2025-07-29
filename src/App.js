import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<News key="everything" pageSize={10} type="everything" country="in" apiKey="a626e591e85a4c618f76e0ae74939e9f" />} />
          <Route path="/top-headlines" element={<News key="headlines" pageSize={10} type="top-headlines" category="" country="in" apiKey="a626e591e85a4c618f76e0ae74939e9f" />} />
          <Route path="/general" element={<News key="general" pageSize={10} type="top-headlines" category="general" country="in" apiKey="a626e591e85a4c618f76e0ae74939e9f" />} />
          <Route path="/business" element={<News key="business" pageSize={10} type="top-headlines" category="business" country="in" apiKey="a626e591e85a4c618f76e0ae74939e9f" />} />
          <Route path="/sports" element={<News key="sports" pageSize={10} type="top-headlines" category="sports" country="in" apiKey="a626e591e85a4c618f76e0ae74939e9f" />} />
          <Route path="/entertainment" element={<News key="entertainment" pageSize={10} type="top-headlines" category="entertainment" country="in" apiKey="a626e591e85a4c618f76e0ae74939e9f" />} />
          <Route path="/health" element={<News key="health" pageSize={10} type="top-headlines" category="health" country="in" apiKey="a626e591e85a4c618f76e0ae74939e9f" />} />
          <Route path="/science" element={<News key="science" pageSize={10} type="top-headlines" category="science" country="in" apiKey="a626e591e85a4c618f76e0ae74939e9f" />} />
          <Route path="/technology" element={<News key="technology" pageSize={10} type="top-headlines" category="technology" country="in" apiKey="a626e591e85a4c618f76e0ae74939e9f" />} />
        </Routes>
      </Router>
    );
  }
}
