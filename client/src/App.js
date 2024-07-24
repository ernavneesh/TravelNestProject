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
import MyBookings from './components/MyBookings/MyBookings';
import PackageDetails from './components/PackageDetails/PackageDetails';
import Registration from './components/Registration/Registration/.';

function App() {
  return (
    <SessionProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Destinations />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<DestinationDetails />} />
              <Route path="/packages/:id" element={<PackageDetails />} />
              <Route path="/bookinginfo" element={<BookingDetails />} />
              <Route path="/processing" element={<Processing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/mybookings" element={<MyBookings />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App;
