// App.js
import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <Navbar />
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route path="/" element={<News key="everything" setProgress={setProgress} pageSize={10} type="everything" query="india" country="us" apiKey={process.env.REACT_APP_NEWS_API} />} />
        <Route path="/top-headlines" element={<News key="headlines" setProgress={setProgress} pageSize={10} type="top-headlines" category="" country="us" apiKey={process.env.REACT_APP_NEWS_API} />} />
        <Route path="/general" element={<News key="general" setProgress={setProgress} pageSize={10} type="top-headlines" category="general" country="us" apiKey={process.env.REACT_APP_NEWS_API} />} />
        <Route path="/business" element={<News key="business" setProgress={setProgress} pageSize={10} type="top-headlines" category="business" country="us" apiKey={process.env.REACT_APP_NEWS_API} />} />
        <Route path="/sports" element={<News key="sports" setProgress={setProgress} pageSize={10} type="top-headlines" category="sports" country="us" apiKey={process.env.REACT_APP_NEWS_API} />} />
        <Route path="/entertainment" element={<News key="entertainment" setProgress={setProgress} pageSize={10} type="top-headlines" category="entertainment" country="us" apiKey={process.env.REACT_APP_NEWS_API} />} />
        <Route path="/health" element={<News key="health" setProgress={setProgress} pageSize={10} type="top-headlines" category="health" country="us" apiKey={process.env.REACT_APP_NEWS_API} />} />
        <Route path="/science" element={<News key="science" setProgress={setProgress} pageSize={10} type="top-headlines" category="science" country="us" apiKey={process.env.REACT_APP_NEWS_API} />} />
        <Route path="/technology" element={<News key="technology" setProgress={setProgress} pageSize={10} type="top-headlines" category="technology" country="us" apiKey={process.env.REACT_APP_NEWS_API} />} />
      </Routes>
    </Router>
  );
}

export default App;
