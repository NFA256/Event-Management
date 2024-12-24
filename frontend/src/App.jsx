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
        <Route path="/testimonial" element={<Testimonial />} />

        {/* //------Admin */}
        <Route path="/admin" element={<Sidebar />}>
          <Route path="addspeaker" element={<Addspeaker />} />
          <Route path="showspeaker" element={<Showspeaker />} />
          <Route path="addhall" element={<Addhall />} />
          <Route path="showhall" element={<Showhall />} />
          <Route path="addbooth" element={<Addbooth />} />
          <Route path="showbooth" element={<Showbooth />} />
          <Route path="addfloor" element={<Addfloor />} />
          <Route path="showfloor" element={<Showfloor />} />
          <Route path="addworkshop" element={<Addworkshop />} />
          <Route path="showworkshop" element={<Showworkshop />} />
          {/* <Route path="calendar" element={<EventCalendar />} /> */}
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
