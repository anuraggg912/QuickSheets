import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';

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
  const showFooter = !['/order', '/payment', '/orderconfirmation'].includes(location.pathname);

  const homeComponents = [
    { component: <Hero />, key: 'hero' },
    { component: <Title title="OUR PRICING" />, key: 'pricing-title' },
    { component: <Pricing />, key: 'pricing' },
    { component: <Title title="OUR REVIEWS" subtitle="What our customers said about us" />, key: 'reviews-title' },
    { component: <Review />, key: 'reviews' },
    { component: <Title title="CONTACT US" />, key: 'contact-title' },
    { component: <Contact />, key: 'contact' },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
      </Routes>
      {isHomePage && homeComponents.map(({ component, key }) => <React.Fragment key={key}>{component}</React.Fragment>)}
      {showFooter && <Footer />}
      <SpeedInsights />
    </>
  );
}

export default App;
