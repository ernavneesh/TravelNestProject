import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Destinations from './components/Destinations/Destinations';
import PackageDetails from './components/PackageDetails/PackageDetails'; 
import DestinationDetails from './components/Destinations/DestinationDetails';
import AboutUs from './components/AboutUs/AboutUs';
import Registration from './components/Registration/Registration/.';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<DestinationDetails />} />
              <Route path="/register" element={<Registration />} />
               {/* Add Registration route */}
              <Route path="/packages/:id" element={<PackageDetails />} />
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
