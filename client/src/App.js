import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Destinations from './components/Destinations/Destinations';
import Search from './components/Search/Search';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

const Home = () => (
  <>
    <Destinations />
  </>
);

export default App;
