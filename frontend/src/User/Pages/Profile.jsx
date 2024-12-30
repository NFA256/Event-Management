import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    cnic: "",
    password: "",
    role: {},
    phone: "",
    mobile: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/users/USER_ID`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser.user);
      localStorage.setItem("user", JSON.stringify(updatedUser.user));
      setIsEditing(false);
    } else {
      console.error("Failed to update user profile");
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
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 bg-info text-center "
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <img
                      src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                      alt="Avatar"
                      className="img-fluid rounded-circle my-5"
                      style={{ width: "100px" }}
                    />
                    <h3 className="text-capitalize">
                      {user.role.RoleName || "No Role"}
                    </h3>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h4 className="text-center">Information</h4>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1 text-center">
                        <div className="col-4 mb-3">
                          <h6>Name</h6>
                          <p>{user.name}</p>
                        </div>
                        <div className="col-8 mb-3">
                          <h6>Email</h6>
                          <p>{user.email}</p>
                        </div>
                      </div>

                      <div className="row pt-1 text-center">
                        <div className="col-4 mb-3">
                          <h6>Status</h6>
                          <p>{user.role.Status || "Unknown"}</p>
                        </div>
                        <div className="col-8 mb-3">
                          <h6>Cnic</h6>
                          <p>{user.cnic}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          className="btn3"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isEditing && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsEditing(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cnic</label>
                    <input
                      type="text"
                      name="cnic"
                      value={user.cnic}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary btn-lg"
                      onClick={() => setIsEditing(false)}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn3">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
