import React from "react";
import Navbar from "./User/Components/Navbar";
import Footer from "./User/Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext';

import About from "./User/Components/About";
import Schedule from "./User/Components/Schedule";
import Contact from "./User/Pages/Contact";
import Home from "./User/Pages/Home";
import Login from "./User/Pages/Login";
import Register from "./User/Pages/Register";
import ExhibitorRegister from "./User/Pages/ExhibitorRegister";
import Sidebar from "./Admin/Components/Sidebar";
import Error from "./User/Pages/Error";
import Faq from "./User/Pages/Faq";
import Testimonial from "./User/Components/Testimonial";
import Speaker from "./User/Components/Speakers";
import Addspeaker from "./Admin/Pages/Addspeaker";
import Showspeaker from "./Admin/Pages/Showspeaker";
import Addhall from "./Admin/Pages/Addhall";
import Showhall from "./Admin/Pages/Showhall";
import Addbooth from "./Admin/Pages/Addbooth";
import Showbooth from "./Admin/Pages/Showbooth";
import Addfloor from "./Admin/Pages/Addfloor";
import Showfloor from "./Admin/Pages/Showfloor";
import Addworkshop from "./Admin/Pages/Addworkshop";
import Showworkshop from "./Admin/Pages/Showworkshop";
import Addevent from "./Admin/Pages/Addevent";
import Showevent from "./Admin/Pages/Showevent";
import Addseminar from "./Admin/Pages/Addseminar";
import Showseminar from "./Admin/Pages/Showseminar";
import AdminProfile from "./Admin/Pages/Profile";
import EventCalendar from "./Admin/Pages/EventCalendar";
import Workshop from "./User/Pages/Workshop";
import Seminar from "./User/Pages/Seminar";
import Events from "./User/Pages/Events";
import Profile from "./User/Pages/Profile";
import Book from "./Admin/Pages/Book";
import Tickets from "./Admin/Pages/Tickets";
import Showtickets from "./Admin/Pages/showtickets";
const App = () => {
  return (
    <UserProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/becomaexhibitor" element={<ExhibitorRegister />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/seminar" element={<Seminar />} />
        <Route path="/event" element={<Events />} />
        <Route path="/profile" element={<Profile />} />

        {/* //------Admin */}
        <Route path="/admin" element={<Sidebar />}>
          <Route index element={<AdminProfile />} />
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
          <Route path="addevent" element={<Addevent />} />
          <Route path="showevent" element={<Showevent />} />
          <Route path="addseminar" element={<Addseminar />} />
          <Route path="showseminar" element={<Showseminar />} />
          <Route path="book" element={<Book />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="showtickets" element={<Showtickets/>} />



          <Route path="calendar" element={<EventCalendar />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </UserProvider>
  );
};

export default App;
