import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ minHeight: "100vh", margin: 0 }}>
      <div className="row" style={{ minHeight: "100vh", margin: 0 }}>
        <div
          className="col-2"
          style={{
            height: "100vh", // Ensure sidebar takes full height
            backgroundColor: "#218fb1ee",
            padding: "20px 0",
            boxShadow: "3px 0 7px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ul className="nav text-center nav-pills mt-2 flex-column">
            <li className="nav-item fs-4 fw-medium">
              <Link
                to="question"
                style={{
                  padding: "15px 20px",
                  textDecoration: "none",
                  display: "block",
                  borderRadius: "4px",
                  color: "#fff",
                  backgroundColor: "#218fb1", // Highlight color for better visibility
                  transition: "background-color 0.3s",
                  fontfamily: "Sarabun",
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#043544ee"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#218fb1"}
              >
                Add User
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-10">
          <div className="container text-center mt-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
