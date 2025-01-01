import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [sessions, setSessions] = useState([]);

  // Fetch schedules, seminars, workshops, and sessions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scheduleResponse, eventResponse, seminarResponse, workshopResponse, sessionResponse] = await Promise.all([
          fetch("https://eventsphere-project.vercel.app/schedules"),
          fetch("https://eventsphere-project.vercel.app/events"),
          fetch("https://eventsphere-project.vercel.app/seminars"),
          fetch("https://eventsphere-project.vercel.app/workshops"),
          fetch("https://eventsphere-project.vercel.app/sessions"),
        ]);

        const scheduleData = await scheduleResponse.json();
        const eventData = await eventResponse.json();
        const seminarData = await seminarResponse.json();
        const workshopData = await workshopResponse.json();
        const sessionData = await sessionResponse.json();

        // Map the seminars, workshops, and sessions into an easy-to-access format
        const eventMap = eventData.reduce((acc, item) => {
          acc[item.schedule_id._id] = item.title;
          return acc;
        }, {});

        const seminarMap = seminarData.reduce((acc, item) => {
          acc[item.schedule_id._id] = item.title;
          return acc;
        }, {});

        const workshopMap = workshopData.reduce((acc, item) => {
          acc[item.schedule_id._id] = item.title;
          return acc;
        }, {});

        // Map the sessions with workshop_id
        const sessionMap = sessionData.reduce((acc, session) => {
          console.log(session)
          if (!acc[session.workshop_id._id]) {
            acc[session.workshop_id._id] = [];
          }
          acc[session.workshop_id._id].push(session);
          return acc;
        }, {});

        // Format events and associate titles
        const formattedEvents = scheduleData.map((schedule) => {
          let eventTitle = "Event";
          if (schedule.reserved_for === "Event") {
            eventTitle = eventMap[schedule._id] || "Events";
          } else if (schedule.reserved_for === "Seminar") {
            eventTitle = seminarMap[schedule._id] || "Seminar";
          } else if (schedule.reserved_for === "Workshop") {
            eventTitle = workshopMap[schedule._id] || "Workshop";
          }

          return {
            title: eventTitle,
            start: new Date(schedule.start_date),
            end: new Date(schedule.end_date),
            allDay: true,
            category: schedule.reserved_for,
            schedule_id: schedule._id,
          };
        });

        // Map sessions to events (based on workshops)
        const sessionEvents = [];
        workshopData.forEach((workshop) => {
          if (sessionMap[workshop._id]) {
            console.log(sessionMap[workshop._id])
            sessionMap[workshop._id].forEach((session) => {
              sessionEvents.push({
                title: `Day ${session.day_no}: ${session.title}`,
                start: new Date(session.date),
                end: new Date(session.date),
                allDay: true,
                category: "Session",
                session_id: session._id,
                color: "blue", // Set the color for sessions
              });
            });
          }
        });

        // Merge all events
        setEvents([...formattedEvents, ...sessionEvents]);
        setSeminars(seminarData);
        setWorkshops(workshopData);
        setSessions(sessionData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("Seminar");
  const [isUpdating, setIsUpdating] = useState(false);
  const [newEventDate, setNewEventDate] = useState(null);

  const today = moment().startOf("day");

  const handleSelectSlot = ({ start }) => {
    const selectedMoment = moment(start).startOf("day");
    const existingEvent = events.find((event) =>
      moment(event.start).isSame(start, "day")
    );
  
    if (existingEvent) {
      setSelectedDate(start);
      setNewEventDate(start);
      setEventTitle(existingEvent.title);
      setEventCategory(existingEvent.category);
      setIsUpdating(true);
      setModalOpen(true);
    } else if (selectedMoment.isBefore(today)) {
      alert("You cannot create events on past dates.");
    } else {
      setSelectedDate(start);
      setIsUpdating(false);
      setModalOpen(true);
    }
  };

  const handleSaveEvent = () => {
    if (isUpdating) {
      setEvents(
        events.map((event) =>
          moment(event.start).isSame(selectedDate, "day")
            ? {
                ...event,
                title: eventTitle,
                category: eventCategory,
                start: newEventDate || event.start,
                end: newEventDate || event.end,
              }
            : event
        )
      );
    } else {
      setEvents([
        ...events,
        {
          title: eventTitle || "New Event",
          start: selectedDate,
          end: selectedDate,
          allDay: true,
          category: eventCategory,
        },
      ]);
    }
    setModalOpen(false);
    resetModal();
  };

  const handleDeleteEvent = () => {
    setEvents(
      events.filter((event) => !moment(event.start).isSame(selectedDate, "day"))
    );
    setModalOpen(false);
    resetModal();
  };

  const resetModal = () => {
    setSelectedDate(null);
    setEventTitle("");
    setEventCategory("Seminar");
    setIsUpdating(false);
    setNewEventDate(null);
  };

  const eventPropGetter = (event) => {
    let backgroundColor;
   
      switch (event.category) {
        case "Seminar":
          backgroundColor = "red";
          break;
        case "Workshop":
          backgroundColor = "blue";
          break;
        case "Session":
          backgroundColor = "lightBlue";
          break;
        default:
          backgroundColor = "green";
      }
    
    return { style: { backgroundColor, color: "white", borderRadius: "5px" } };
  };

  const isDateSelectable = (date) => {
    const dateMoment = moment(date).startOf("day");
    const isBooked = events.some((event) =>
      moment(event.start).isSame(date, "day")
    );
    return !dateMoment.isBefore(today) || isBooked;
  };

  const CustomDayWrapper = (props) => {
    const { value, children } = props;
    const selectable = isDateSelectable(value);

    return (
      <div
        style={{
          backgroundColor: selectable ? undefined : "#f0f0f0",
          pointerEvents: selectable ? "auto" : "none",
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="section-tittle">
        <h2 className="text-center mb-4"> Event Management Calendar</h2>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.MONTH}
        style={{
          height: "600px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
        selectable
        components={{
          dateCellWrapper: CustomDayWrapper,
        }}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventPropGetter}
      />

      {/* Modal */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isUpdating ? "Update Event" : "Schedule Event"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  {isUpdating
                    ? `Update the event on `
                    : `Schedule an event on `}
                  <strong>{moment(selectedDate).format("MMMM Do YYYY")}</strong>
                </p>
                <div className="mb-3">
                  <label htmlFor="eventTitle" className="form-label">
                    Event Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eventCategory" className="form-label">
                    Event Category
                  </label>
                  <select
                    className="form-select"
                    id="eventCategory"
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                  >
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Session">Session</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                {isUpdating && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteEvent}
                  >
                    Delete Event
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEvent}
                >
                  {isUpdating ? "Update Event" : "Save Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
