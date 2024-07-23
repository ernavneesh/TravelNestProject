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
import Payment from './components/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PcxHYHdWUZnn01otPVySYcfLnYPt92VUNiVieydSW4buIZgvuA6cICM62wXgYHNqZ8veYcTUq2Rqi9A7maxL7So00sG2rnyd9');

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
              <Route 
                path="/payment" 
                element={
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                } 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App;
