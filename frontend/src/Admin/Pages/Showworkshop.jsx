import React, { useEffect, useState } from "react";

const Showworkshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [halls, setHalls] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    // Fetching workshops data from the API using fetch
    fetch("http://localhost:5000/workshops")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWorkshops(data);
        } else {
          console.error("Workshops data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the workshops:", error);
      });

    // Fetching sessions data from the API using fetch
    fetch("http://localhost:5000/sessions")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSessions(data);
        } else {
          console.error("Sessions data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the sessions:", error);
      });

    // Fetching halls data from the API
    fetch("http://localhost:5000/halls")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHalls(data);
        } else {
          console.error("Halls data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the halls:", error);
      });

    // Fetching speakers data from the API
    fetch("http://localhost:5000/speakers")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSpeakers(data);
        } else {
          console.error("Speakers data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the speakers:", error);
      });
  }, []);

  useEffect(() => {
    // Combining the workshops and sessions data
    const combined = workshops.map((workshop) => {
      // Find the corresponding session data for the current workshop

      const workshopSessions = sessions.filter(
        (session) => session.workshop_id._id === workshop._id
      );
      // Add sessions to the workshop data
      return { ...workshop, sessions: workshopSessions };
    });

    setCombinedData(combined);
    console.log(combinedData)
  }, [workshops, sessions]);

  // Helper function to get hall name from hallId
  const getHallName = (hallId) => {
    const hall = halls.find((hall) => hall._id === hallId);
    console.log("hall",halls)
    return hall ? hall.hall_name : "Unknown Hall";
  };

  // Helper function to get speaker name from speakerId
  const getSpeakerName = (speakerId) => {
    const speaker = speakers.find((speaker) => speaker._id === speakerId);
    return speaker ? speaker.name : "Unknown Speaker";
  };

  return (
    <div className="container mt-5">
      <h3>Workshop and Session Records</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Workshop Title</th>
            <th>Total Sessions</th>
            <th>Session Titles</th>
            <th>Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Workshop Image</th>
            <th>Hall</th>
            <th>No of Attendees</th>
            <th>Speaker</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((workshop, index) => (
            <tr key={index}>
              <td>{workshop.title}</td>
              <td>{workshop.sessions.length}</td>
              <td>
                {workshop.sessions.map((session, idx) => (
                  <div key={idx}>{session.title}</div>
                ))}
              </td>
              <td>{workshop.price}</td>
              <td>{new Date(workshop.start_date).toLocaleDateString()}</td>
              <td>{new Date(workshop.end_date).toLocaleDateString()}</td>
              <td>{workshop.description}</td>
              <td>
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  width="100"
                  height="100"
                />
              </td>
              <td>{getHallName(workshop.hall_id._id)}</td>
              <td>{workshop.no_of_attendees}</td>
              <td>{getSpeakerName(workshop.speaker_id._id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Showworkshop;
