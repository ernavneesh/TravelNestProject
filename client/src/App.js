import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Destinations from './components/Destinations/Destinations';
import LoginPage from './components/Login/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
                            <Route path="/destinations" element={<Destinations />} />
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
