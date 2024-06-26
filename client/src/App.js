import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Destinations from './components/Destinations/Destinations';
import Registration from './components/Registration/Registration'; // Import Registration component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/register" element={<Registration />} /> {/* Add Registration route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    
  
    <Destinations />
  </div>
);

export default App;
