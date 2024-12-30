import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser ] = useState({
    name: "",
    email: "",
    cnic: "",
    password: "",
    // role: "",
    location: "",
    phone: "",
    mobile: "",
    website: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
    avatarUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser  = localStorage.getItem("user");
    if (storedUser ) {
      setUser (JSON.parse(storedUser ));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser ((prevUser ) => ({
      ...prevUser ,
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
      const updatedUser  = await response.json();
      setUser (updatedUser .user);
      localStorage.setItem("user", JSON.stringify(updatedUser .user));
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
                  <h5 className="my-3">{user.name}</h5>
                  {/* <p className="text-muted mb-1">{user.role}</p>
                  <p className="text-muted mb-4">{user.location}</p> */}
                  <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-primary">
                      Follow
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
              {/* Social Links */}
              {/* <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fas fa-globe fa-lg text-warning"></i>
                      <p className="mb-0">{user.website}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-github fa-lg text-body"></i>
                      <p className="mb-0">{user.github}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-twitter fa-lg"
                        style={{ color: "#55acee" }}
                      ></i>
                      <p className="mb-0">{user.twitter}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      ></i>
                      <p className="mb-0">{user.instagram}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-facebook-f fa-lg"
                        style={{ color: "#3b5998" }}
                      ></i>
                      <p className="mb-0">{user.facebook}</p>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>

            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">CNIC</p>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="cnic"
                            value={user.cnic}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Mobile</p>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="mobile"
                            value={user.mobile}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <hr />
                      {/* <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="location"
                            value={user.location}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <hr /> */}
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{user.name}</p>
                        </div>
                      </div>
                      <hr />
                      {/* <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm <p className="text-muted mb-0">{user.email}</p>
                        </div>
                      </div> */}
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">CNIC</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{user.cnic}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{user.phone}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Mobile</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{user.mobile}</p>
                        </div>
                      </div>
                      <hr />
                      {/* <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{user.location}</p>
                        </div>
                      </div> */}
                      <button
                        className="btn btn-primary mt-3"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;

