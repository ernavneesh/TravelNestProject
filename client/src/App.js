import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Destinations from './components/Destinations/Destinations';
import DestinationDetails from './components/Destinations/DestinationDetails';
import AboutUs from './components/AboutUs/AboutUs';
import LoginPage from './components/Login/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingDetails from './components/BookingDetails/BookingDetails';
import Processing from './components/BookingDetails/Processing';
import { SessionProvider } from './context/SessionContext';

function App() {
  return (
    <SessionProvider>
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
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </SessionProvider>
  );
}

const Home = () => (
  <>
    <Destinations />
  </>
);

export default App;
