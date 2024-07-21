import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './Topbar/Topbar';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Hero from './components/Hero/Hero';
import Title from './Title/Title';
import Review from './components/Review/Review';
import Pricing from './pages/Pricing/Pricing';
import Order from './components/Orderpage/Order';
import Payment from './components/Payment/Payment';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <div className="container">
      <Router>
        <Topbar />
        <Navbar />
        <AppContent />
      </Router>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const showFooter = !['/order', '/payment'].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      {isHomePage && (
        <>
          <Hero />
          <Title title="OUR PRICING" />
          <Pricing />
          <Title title="OUR REVIEWS" subtitle="What our customers said about us" />
          <Review />
          <Title title="CONTACT US" />
          <Contact />
        </>
      )}
      {showFooter && <Footer />}
      <SpeedInsights />
    </>
  );
}

export default App;
