import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './MediaQuery.css';
import NavBar from './components/Assets/NavBar';
import TrustNavbar from './components/Assets/TrustNavbar'; // Import the TrustNavbar component
import HomePage from './components/Pages/HomePage';
import Login from './components/Pages/Login';
import PostReview from './components/Pages/PostReview';
import Users from './components/Pages/Users';
import Footer from './components/Assets/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchResult from './components/Pages/SearchResult';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Trust from './components/Pages/Trust';
import CombatingFakeReviews from './components/Pages/CombatingFakeReviews';
import OurBusinessModel from './components/Pages/OurBusinessModel';
import TrustContact from './components/Pages/TrustContact';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx">
        <Router>
          <ConditionalNavbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/evaluate/:company" element={<PostReview />} />
            <Route exact path="/users/:userId" element={<Users />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Settings" element={<Settings />} />
            <Route exact path="/search/:searchText" element={<SearchResult />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/trust" element={<Trust />} />
            <Route exact path="/trust/combating-fake-reviews" element={<CombatingFakeReviews />} />
            <Route exact path="/trust/our-business-model" element={<OurBusinessModel />} />
            <Route exact path="/trust/contact" element={<TrustContact />} />
          </Routes>
          <ConditionalFooter/>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  return location.pathname.startsWith('/trust') ? <TrustNavbar /> : <NavBar />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  return location.pathname.startsWith('/trust') ?    <Footer bgColor="ThemePurple" /> :    <Footer bgColor="ThemeBlack" />;
};

export default App;