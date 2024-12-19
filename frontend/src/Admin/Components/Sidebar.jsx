import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    // Fetch user role from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) {
      setRole(storedUser.role.RoleName); // Access RoleName within the role object
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", margin: 0 }}>
      <div className="row" style={{ minHeight: "100vh", margin: 0 }}>
        <div
          className="col-2"
          style={{
            height: "100vh",
            backgroundColor: "#218fb1ee",
            padding: "20px 0",
            boxShadow: "3px 0 7px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="text-center text-white mb-4">
            <h2>{role === "exhibitor" ? "Exhibitor" : "Admin"}</h2>
          </div>

          <ul className="nav text-center nav-pills mt-2 flex-column">
            {role === "exhibitor" ? (
              <>
                <li className="nav-item fs-4 fw-medium">
                  <Link
                    to="exhibitor-dashboard"
                    style={{
                      padding: "15px 20px",
                      textDecoration: "none",
                      display: "block",
                      borderRadius: "4px",
                      color: "#fff",
                      backgroundColor: "#218fb1",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#043544ee")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#218fb1")
                    }
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item fs-4 fw-medium">
                  <Link
                    to="manage-exhibits"
                    style={{
                      padding: "15px 20px",
                      textDecoration: "none",
                      display: "block",
                      borderRadius: "4px",
                      color: "#fff",
                      backgroundColor: "#218fb1",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#043544ee")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#218fb1")
                    }
                  >
                    Manage Exhibits
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item fs-4 fw-medium">
                  <Link
                    to="add-user"
                    style={{
                      padding: "15px 20px",
                      textDecoration: "none",
                      display: "block",
                      borderRadius: "4px",
                      color: "#fff",
                      backgroundColor: "#218fb1",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#043544ee")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#218fb1")
                    }
                  >
                    Add User
                  </Link>
                </li>
                <li className="nav-item fs-4 fw-medium">
                  <Link
                    to="manage-users"
                    style={{
                      padding: "15px 20px",
                      textDecoration: "none",
                      display: "block",
                      borderRadius: "4px",
                      color: "#fff",
                      backgroundColor: "#218fb1",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#043544ee")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#218fb1")
                    }
                  >
                    Manage Users
                  </Link>
                </li>
                <li className="nav-item fs-4 fw-medium">
                  <Link
                    to="manage-roles"
                    style={{
                      padding: "15px 20px",
                      textDecoration: "none",
                      display: "block",
                      borderRadius: "4px",
                      color: "#fff",
                      backgroundColor: "#218fb1",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#043544ee")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#218fb1")
                    }
                  >
                    Manage Roles
                  </Link>
                </li>
              </>
            )}
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
