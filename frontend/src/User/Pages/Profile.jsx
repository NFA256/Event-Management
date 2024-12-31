import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [userId, setuserId] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    cnic: "",
    role: {}, // role will have RoleName
  });
  const [tickets, setTickets] = useState([]); // Initialize tickets as an empty array

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setuserId(user.userId);
      fetchUserData(user.userId);
      fetchUserTickets(user.userId); // Fetch tickets for the user
    }
  }, []);

  // Function to fetch user data
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("userData", data);
        setUser(data.data); // Assuming the data is in data.data
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (error) {
      setError("An error occurred while fetching user data.");
    }
  };

  // Function to fetch user tickets
  const fetchUserTickets = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/ticket-user-id?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("userTickets", data);
        setTickets(data.data || []); // If data.tickets is undefined, use an empty array
      } else {
        setError("Failed to fetch tickets.");
      }
    } catch (error) {
      setError("An error occurred while fetching tickets.");
    }
  };

  return (
    <>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Dashboard</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                <img
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <p className="text-capitalize text-muted mb-1">{user.role.RoleName}</p> {/* RoleName from role object */}
                  <div className="d-flex justify-content-center mb-2">
                    {/* Removed Follow and Message buttons */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">CNIC</p> {/* Display CNIC if available */}
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.cnic}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{
  user.role.RoleName === "attendee"
  ?
(
  null
    // <section className="container py-5">
    //     <div className="row">
    //       <div className="col-lg-12">
    //         <div className="card">
    //           <div className="card-header">
    //             <h4>Your Tickets</h4>
    //           </div>
    //           <div className="card-body">
    //             {tickets.length > 0 ? (
    //               <ul className="list-group">
    //                 {tickets.map((ticket, index) => (
    //                   <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
    //                     <span>{ticket.semminar_id?.title || ticket.workshop_id?.title}</span> {/* Replace with actual ticket details */}
    //                     <span>{ticket.total_price}</span> {/* Replace with actual ticket date */}
    //                   </li>
    //                 ))}
    //               </ul>
    //             ) : (
    //               <p>No tickets found.</p>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
)
  : null
}
      {/* New Section for Tickets */}
    
    </>
  );
};

export default UserProfile;
