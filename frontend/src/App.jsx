import React from 'react';
import Navbar from './User/Components/Navbar';
import Footer from './User/Components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './User/Components/About';
import Speakers from './User/Components/Speakers';
import Schedule from './User/Components/Schedule';
import Contact from './User/Pages/Contact';
import Home from './User/Pages/Home';
import Login from './User/Pages/Login';
import Register from './User/Pages/Register';
import Sidebar from './Admin/Components/Sidebar';
import Error from './User/Pages/Error';
import Faq from './User/Pages/Faq';

const App = () => {
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/speaker" element={<Speakers />} />
        <Route path="/faq" element={<Faq />} />

        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Sidebar />} />
  {/* Fallback route */}
  <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
