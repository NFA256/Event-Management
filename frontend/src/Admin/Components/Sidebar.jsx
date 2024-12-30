import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.role?.RoleName) {
      setRole(storedUser.role.RoleName);
    }
  }, []);

  const sidebarStyle = {
    height: "100vh", // Full height for the sidebar
    backgroundColor: "#218fb1ee",
    padding: "20px 0",
    boxShadow: "3px 0 7px rgba(0, 0, 0, 0.1)",
    overflowY: "auto", // Enable scrolling
  };

  const linkStyle = {
    padding: "15px 20px",
    textDecoration: "none",
    display: "block",
    borderRadius: "4px",
    color: "#fff",
    backgroundColor: "#218fb1",
    transition: "background-color 0.3s",
  };

  const linkHoverStyle = "#043544ee";

  const scrollbarStyle = `
    ::-webkit-scrollbar {
      width: 6px; /* Thin scrollbar width */
    }
    ::-webkit-scrollbar-track {
      background: #218fb1ee; /* Background of the scrollbar track */
    }
    ::-webkit-scrollbar-thumb {
      background: #043544ee; /* Scrollbar thumb color */
      border-radius: 10px; /* Rounded edges */
    }
  `;

  return (
    <div style={{ minHeight: "100vh", margin: 0 }}>
      <style>{scrollbarStyle}</style> {/* Inline CSS for the scrollbar */}
      <div className="row" style={{ minHeight: "100vh", margin: 0 }}>
        <div className="col-2" style={sidebarStyle}>
          <div className=" text-center text-white mb-4">
            <h2>
              <strong>
                {role === "exhibitor" ? "Exhibitor" : "Organizer"}
              </strong>
            </h2>
          </div>

          <ul className="nav text-center nav-pills mt-2 flex-column">
            {(role === "exhibitor"
              ? [
                  { path: "exhibitor-dashboard", label: "Dashboard" },
                  { path: "manage-exhibits", label: "Manage Exhibits" },
                  { path: "addevent", label: "Add Event" },
                  { path: "showevent", label: "Show Event" },
                ]
              : [
                  { path: "calendar", label: "Event Schedule" },
                  { path: "addspeaker", label: "Add Speaker" },
                  { path: "Showspeaker", label: "Show Speaker" },
                  { path: "addhall", label: "Add Hall" },
                  { path: "showhall", label: "Show Hall" },
                  { path: "addbooth", label: "Add Booth" },
                  { path: "showbooth", label: "Show Booth" },
                  { path: "addfloor", label: "Add Floor" },
                  { path: "showfloor", label: "Show Floor" },
                  { path: "addworkshop", label: "Add Workshop" },
                  { path: "showworkshop", label: "Show Workshop" },
                  { path: "addevent", label: "Add Event" },
                  { path: "showevent", label: "Show Event" },
                  { path: "addseminar", label: "Add Seminar" },
                  { path: "showseminar", label: "Show Seminar" },
                ]
            ).map(({ path, label }) => (
              <li key={path} className="nav-item fs-4 fw-medium">
                <Link
                  to={path}
                  style={linkStyle}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = linkHoverStyle)
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = linkStyle.backgroundColor)
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-10 ">
          <div
            className=" text-center mt-3"
            style={{
              maxHeight: "100vh",
              overflowY: "auto", // Enable scrolling for the Outlet section
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
