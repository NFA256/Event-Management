import React, { useState, useEffect } from "react";

const Seminar = () => {
  const [seminars, setSeminars] = useState([]);
  const [error, setError] = useState("");

  // Fetch seminars on load
  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      const response = await fetch("http://localhost:5000/seminars");
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

  const calculateTimeLeft = (seminarDate, startTime) => {
    const today = new Date();
    const seminarDateObj = new Date(seminarDate);
    const seminarStartTime = new Date(seminarDateObj);

    const [hours, minutes] = startTime.split(":");
    seminarStartTime.setHours(hours);
    seminarStartTime.setMinutes(minutes);

    if (seminarStartTime < today) {
      return { days: 0, hours: 0 }; // Seminar has already started or passed
    }

    const daysLeft = Math.floor(
      (seminarDateObj.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) /
        (1000 * 3600 * 24)
    );

    const hoursLeft = Math.floor((seminarStartTime - today) / (1000 * 3600));

    return {
      days: daysLeft >= 0 ? daysLeft : 0,
      hours: hoursLeft >= 0 ? hoursLeft : 0,
    };
  };

  return (
    <>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Seminar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <section className="home-blog-area mt-5 mb-5">
        <div className="container col-10 mt-5">
          {error && <p className="text-danger">Error: {error}</p>}
          <div className="row">
            {seminars.map((seminar) => {
              const timeLeft = calculateTimeLeft(
                seminar.date,
                seminar.start_time
              );

              return (
                <div className="col-lg-4 col-md-6 col-sm-6" key={seminar._id}>
                  <div className="home-blog-single mb-30">
                    <div className="blog-img-cap">
                      <div className="blog-img">
                        <img src={seminar.image} alt="" />
                        <div className="blog-date text-uppercase text-center">
                          <span>
                            {new Date(seminar.date).toLocaleDateString()}
                          </span>
                          <p>
                            {timeLeft.days} days and {timeLeft.hours} hours left
                          </p>
                        </div>
                      </div>
                      <div className="blog-cap">
                        <p>| {seminar.purpose}</p>
                        <h2 className="text-center mb-4 text-uppercase">
                          {seminar.title}
                        </h2>
                        <div className="row mb-3 ">
                          <div className="col-6 text-uppercase">
                            <strong>
                              Speaker:{" "}
                              {seminar.speaker_id
                                ? seminar.speaker_id.name
                                : "N/A"}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>
                              Hall:{" "}
                              {seminar.hall_id
                                ? seminar.hall_id.hall_name
                                : "N/A"}
                            </strong>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6 text-uppercase">
                            <strong>Capacity: {seminar.capacity}</strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>Price: {seminar.price}/=</strong>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-6 text-uppercase">
                            <strong>
                              Start Time:{" "}
                              {new Date(
                                `1970-01-01T${seminar.start_time}Z`
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </strong>
                          </div>
                          <div className="col-6 text-uppercase">
                            <strong>
                              End Time:{" "}
                              {new Date(
                                `1970-01-01T${seminar.end_time}Z`
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </strong>
                          </div>
                        </div>
                        <div className="text-center mt-5">
                          <button className="btn3" type="submit">
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Seminar;
