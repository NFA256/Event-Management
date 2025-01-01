import React, { useEffect, useState } from 'react';

const Showtickets = () => {
    const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    // Fetch tickets from backend API
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://eventsphere-project.vercel.app/tickets');  // Your endpoint to fetch tickets
        const data = await response.json();
        console.log("tt",data)
        setTickets(data.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);


  return (
    <div style={{ padding: '20px' }}>
      <h3>Admin Panel - Ticket Management</h3>

      {/* Seminar Tickets Table */}
      <h4 style={{ marginTop: '20px' }}>Seminar Tickets</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>#</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ticket ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>User Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>User Role</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Event Title</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Speaker Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hall Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets
            .filter((ticket) => ticket.seminar_id) // Only seminar tickets
            .map((ticket, index) => (
              <tr key={ticket._id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket._id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.user_id.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.user_id.role.RoleName}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.seminar_id?.title || "N/A"}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.seminar_id?.speaker_id?.name || "N/A"}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.seminar_id?.hall_id?.hall_name || "N/A"}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.total_price}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(ticket.seminar_id?.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Workshop Tickets Table */}
      <h4 style={{ marginTop: '20px' }}>Workshop Tickets</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>#</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ticket ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>User Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>User Role</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Event Title</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Speaker Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hall Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Sessions</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets
            .filter((ticket) => ticket.workshop_id) // Only workshop tickets
            .map((ticket, index) => (
              <tr key={ticket._id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket._id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.user_id.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.user_id.role.RoleName}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.workshop_id?.title || "N/A"}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.workshop_id?.speaker_id?.name || "N/A"}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.workshop_id?.hall_id?.hall_name || "N/A"}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {ticket.workshop_id?.total_sessions || "N/A"}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{ticket.total_price}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(ticket.workshop_id?.start_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Showtickets