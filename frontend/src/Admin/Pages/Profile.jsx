import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    cnic: "",
    role: {},
  });
  const [exhibitorData, setExhibitorData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.userId);
      fetchUserData(user.userId); // Fetch user data
      if(user.role.RoleName === "exhibitor"){

        fetchExhibitorData(user.exhibitorId); // Fetch exhibitor data
      }
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, []);

  // Function to fetch user data
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`https://eventsphere-project.vercel.app/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.data); // Assuming the data is in data.data
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (error) {
      setError("An error occurred while fetching user data.");
    }
  };

  // Function to fetch exhibitor data
  const fetchExhibitorData = async (exhibitorId) => {
    try {
      const response = await fetch(`https://eventsphere-project.vercel.app/exhibitors/${exhibitorId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("exhibitorData",data.data)
        setExhibitorData(data.data); // Assuming the data is in data.data
      } else {
        setError("Failed to fetch exhibitor data.");
      }
    } catch (error) {
      setError("An error occurred while fetching exhibitor data.");
    }
  };

  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={
                      user.role.RoleName === "admin"
                        ? "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                        : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    }
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <p className="text-capitalize text-muted mb-1">{user.role.RoleName}</p>
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
                      <p className="mb-0">CNIC</p>
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

      {/* Exhibitor Section */}
      {exhibitorData && (
  <section className="container py-5">
    <div className="row">
      <div className="col-lg-12">
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">Exhibitor Details</h4>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Exhibitor Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{exhibitorData.name}</p>
              </div>
            </div>
            <hr />
            {/* Correct the access to company details */}
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Company</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{exhibitorData?.company_id?.title}</p>
              </div>
            </div>
            <hr />
            {/* Add company image if needed */}
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Company Image</p>
              </div>
              <div className="col-sm-9">
                <img
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                  src={exhibitorData?.company_id?.image}
                  alt="Company"
                  className="img-fluid"
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Company Description</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{exhibitorData?.company_id?.description}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Contact</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{exhibitorData.contact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}

    </>
  );
};

export default UserProfile;
