import React, { useState, useEffect } from "react";

const HeroSection = () => (
  <div className="slider-area2">
    <div className="slider-height2 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="hero-cap text-center">
              <h2>Schedule</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ScheduleContent = () => {
  const [events, setEvents] = useState([]);
   const [workshops, setWorkshops] = useState([]);
   const [seminars, setSeminars] = useState([]);
    const [error, setError] = useState(null); // Add error state
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch("https://eventsphere-project.vercel.app/events");
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              setEvents(data);
            } else {
              console.error("API response is not an array:", data);
              setError("Invalid data format received from the server.");
              setEvents([]);
            }
          } else {
            console.error("Failed to fetch events");
            setError("Failed to fetch events from the server.");
          }
        } catch (error) {
          console.error("Error fetching events:", error);
          setError("An error occurred while fetching events.");
        }
      };
      const fetchWorkshops = async () => {
        try {
          const response = await fetch("https://eventsphere-project.vercel.app/workshops");
          const data = await response.json();
          if (Array.isArray(data)) {
            setWorkshops(data);
          } else {
            console.error("Workshops data is not an array:", data);
          }
        } catch (error) {
          console.error("There was an error fetching the workshops:", error);
          setError(error.message);
        }
      };
      const fetchSeminars = async () => {
        try {
          const response = await fetch("https://eventsphere-project.vercel.app/seminars");
          const data = await response.json();
    
          if (response.ok) {
            setSeminars(data);
          } else {
            throw new Error(data.message || "Failed to fetch seminars.");
          }
        } catch (err) {
          setError(err.message);
        }
      };
      fetchSeminars()
      fetchWorkshops()
      fetchEvents();
    }, []);

    const lastevents = events.slice(-6);
    const lastseminars = seminars.slice(-6);
    const lastworkshops = workshops.slice(-6);
  return(
  
  <main>
    {/* <!--? Hero Start --> */}

    {/* <!-- Hero End --> */}
    {/* <!--? accordion --> */}
    <section className="accordion fix section-padding30">
      <div className="container">
        <div className="row ">
          <div className="col-lg-11  mx-auto">
            <div className="properties__button mb-40">
              {/* <!--Nav Button  --> */}
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-events"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Events
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-seminar"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                   Seminars
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-workshop"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Workshop
                  </a>
                </div>
              </nav>
              {/* <!--End Nav Button  --> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {/* <!-- Nav Card --> */}
        <div className="tab-content" id="nav-tabContent">
          {/* <!-- Events --> */}
          <div
            className="tab-pane fade show active"
            id="nav-events"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div className="row">
              <div className="col-lg-11 mx-auto">
                <div className="accordion-wrapper">
                  <div className="accordion" id="accordionExample">
                    {/* <!-- single-one --> */}
                    {
                      lastevents.map((event)=>(
                        <div className="card">
                      <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                          <a
                            href="#"
                            className="btn-link collapsed"
                            data-toggle="collapse"
                            data-target={"#collapse"+event._id}
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <span>{event.title}</span>
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id={"collapse"+event._id}
                        className="collapse "
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                         {event.description}
                        </div>
                      </div>
                    </div>
                      ))
                    }
                    
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--Seminar --> */}
          <div
            className="tab-pane fade"
            id="nav-seminar"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div className="row">
              <div className="col-lg-11 mx-auto">
                <div className="accordion-wrapper">
                  <div className="accordion" id="accordionExample">
                    {/* <!-- single-one --> */}
                    {
                      lastseminars.map((seminar)=>(
                        <div className="card">
                      <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                          <a
                            href="#"
                            className="btn-link collapsed"
                            data-toggle="collapse"
                            data-target={"#collapse"+seminar._id}
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <span>{seminar.title}</span>
                            <p>{new Date(seminar.date).toLocaleDateString()}</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id={"collapse"+seminar._id}
                        className="collapse "
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                         {seminar.purpose}
                        </div>
                      </div>
                    </div>
                      ))
                    }
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Workshop --> */}
          <div
            className="tab-pane fade"
            id="nav-workshop"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            <div className="row">
              <div className="col-lg-11 mx-auto">
                <div className="accordion-wrapper">
                  <div className="accordion" id="accordionExample">
                    {/* <!-- single-one --> */}
                    {
                      lastworkshops.map((workshop)=>(
                        <div className="card">
                      <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                          <a
                            href="#"
                            className="btn-link collapsed"
                            data-toggle="collapse"
                            data-target={"#collapse"+workshop._id}
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <span>{workshop.title}</span>
                            <p>{new Date(workshop.start_date).toLocaleDateString()}-{new Date(workshop.end_date).toLocaleDateString()}</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id={"collapse"+workshop._id}
                        className="collapse "
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                         {workshop.description}
                        </div>
                      </div>
                    </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Nav Card --> */}
      </div>
    </section>
    {/* <!-- accordion End --> */}
  </main>
)};
const Schedule = () => {
  return (
    <>
      <HeroSection />
      <ScheduleContent />
    </>
  );
};

export default Schedule;
