import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Destinations from './components/Destinations/Destinations';
import DestinationDetails from './components/Destinations/DestinationDetails';
import AboutUs from './components/AboutUs/AboutUs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingDetails from './components/BookingDetails/BookingDetails';
import Processing from './components/BookingDetails/Processing';
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
              <Route path="/bookinginfo" element={<BookingDetails />} />
              <Route path="/processing" element={<Processing/>} />       
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
