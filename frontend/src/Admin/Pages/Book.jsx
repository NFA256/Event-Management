import React, { useState, useEffect } from "react";

const Book = (refreshBooths) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState(""); // To store the user's role

  useEffect(() => {
    // Fetch user role from localStorage or state
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setRole(user.role);
    }
    console.log(user.exhibitorId);
    // Fetch bookings data from API
    const fetchBookings = async () => {
      setError("");
      try {
        let response;
        if(user.role === "exhibitor")
        {
          response = await fetch(
            `http://localhost:5000/bookings-exhibitor-id?exhibitor_id=${user.exhibitorId}`
          );
        }
        else{

           response = await fetch("http://localhost:5000/bookings");
        }
        if (response.ok) {
          const data = await response.json();
          console.log("bookings",data.data)
          setBookings(data.data); // Assuming the data is in data.data
        } else {
          setError("Failed to fetch booking data.");
        }
      } catch (error) {
        setError("An error occurred while fetching bookings.");
      }
    };

    fetchBookings();
  }, []);

 const handleApprove = async (bookingId, boothId) => {
   try {
     const response = await fetch(
       `http://localhost:5000/bookings/${bookingId}/approve`,
       {
         method: "PATCH",
       }
     );
     if (response.ok) {
       // Update booth reservation status to reserved
       const boothResponse = await fetch(
         `http://localhost:5000/booths/${boothId}`,
         {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ reserved_bool: true }), // Set booth as reserved
         }
       );

       if (boothResponse.ok) {
         // Update booking status to approved
         setBookings((prevBookings) =>
           prevBookings.map((booking) =>
             booking._id === bookingId
               ? { ...booking, status: "approved" }
               : booking
           )
         );
         setSuccess("Booking approved and booth reserved successfully!");

         // Call refreshBooths function from parent component
         if (refreshBooths && typeof refreshBooths === "function") {
           refreshBooths(); // Refresh booths to reflect the status change
         }
       } else {
         throw new Error("Failed to update booth reservation.");
       }
     } else {
       throw new Error("Failed to approve booking.");
     }
   } catch (error) {
     setError(`Error approving booking: ${error.message}`);
   }
 };

 const handleReject = async (bookingId) => {
   try {
     const response = await fetch(
       `http://localhost:5000/bookings/${bookingId}/reject`,
       {
         method: "PATCH",
       }
     );
     if (response.ok) {
       setBookings((prevBookings) =>
         prevBookings.map((booking) =>
           booking._id === bookingId
             ? { ...booking, status: "rejected" }
             : booking
         )
       );
       setSuccess("Booking rejected successfully!");
     } else {
       throw new Error("Failed to reject booking.");
     }
   } catch (error) {
     setError(`Error rejecting booking: ${error.message}`);
   }
 };

 return (
  <div className="col-10 mx-auto mt-5">
    <h1 className="text-center text-uppercase font-weight-bold mb-3">
      Booking Request
    </h1>
    {error && <p className="text-danger">{error}</p>}
    {success && <p className="text-success">{success}</p>}

    {/* Conditional rendering for no bookings */}
    {bookings.length === 0 && role === "exhibitor" ?  (
      <p className="text-muted">You haven't booked any event yet.</p>
    )
    : bookings.length === 0 && role === "admin" ?  (
      <p className="text-muted">No Book request.</p>
    )
    : (
      <table className="table table-bordered">
        <thead>
          <tr className="table-info ">
            <th>#</th>
            <th>Booking ID</th>
            <th>Exhibitor ID</th>
            <th>Event Title</th>
            <th>Booth Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking._id}</td>
              <td>{booking.exhibitor_id._id}</td>
              <td>{booking.event_id._id || "N/A"}</td>
              <td>{booking.booth_id.name}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>
                {/* Show status and actions based on role */}
                {role === "admin" && booking.status === "pending" && (
                  <>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() =>
                        handleApprove(booking._id, booking.booth_id._id)
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm ml-2"
                      onClick={() => handleReject(booking._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {role === "exhibitor" && booking.status === "pending" && (
                  <span className="text-warning">Pending</span>
                )}
                {booking.status === "approved" && (
                  <span className="text-success">
                    {role === "admin" ? "Approved" : "Approved by Admin"}
                  </span>
                )}
                {booking.status === "rejected" && (
                  <span className="text-danger">Rejected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

};

export default Book;
