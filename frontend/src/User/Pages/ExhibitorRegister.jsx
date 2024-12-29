import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FileInput = ({ label, previewImage, onImageChange }) => (
  <div className="row mt-2 mb-3">
    <div className="col-8">
      <div className="form-outline mb-4">
        <label className="form-label">{label}</label>
        <input
          type="file"
          className="form-control text-center form-control-lg"
          onChange={onImageChange}
        />
      </div>
    </div>
    <div className="col-4 mt-3">
      {previewImage ? (
        <img
          style={{
            width: '100px',
            height: '100px',
            display: 'block',
            borderRadius: '8px',
          }}
          alt="Preview"
          className="img-thumbnail"
          src={previewImage}
        />
      ) : (
        <div
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px dashed #ced4da',
            borderRadius: '8px',
            width: '100px',
            height: '100px',
            color: '#6c757d',
            fontSize: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          No Image Selected
        </div>
      )}
    </div>
  </div>
);

const ExhibitorRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    CompanyTitle: '',
    CompanyImage: '',
    previewCompanyImage: null,
    CompanyDescription: '',
    ExhibitorContact: '',
    ExhibitorImage: '',
    previewExhibitorImage: null,
  });

  const [Error, setError] = useState('');
  const [Success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      setIsLoggedIn(true);
    } else {
      navigate('/login');  // Redirect to login page if not logged in
    }
  }, [navigate]);

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image change for file inputs
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type]: file,
        [`preview${type.charAt(0).toUpperCase() + type.slice(1)}`]: URL.createObjectURL(file),
      }));
    }
  };

  // Validate ExhibitorContact to ensure it's 11 digits long
  const validateContact = (contact) => {
    const regex = /^\d{11}$/;  // Regex to check exactly 11 digits
    return regex.test(contact);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { CompanyTitle, CompanyDescription, ExhibitorContact, CompanyImage, ExhibitorImage } = formData;

    // Validate the inputs
    if (!CompanyTitle || !CompanyDescription || !ExhibitorContact || !CompanyImage || !ExhibitorImage) {
      setError('All fields are required!');
      return;
    }

    if (!validateContact(ExhibitorContact)) {
      setError('Contact number must be exactly 11 digits!');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : null;

    if (!userId) {
      setError('User not logged in!');
      return;
    }

    const exhibitorRole = 'exhibitor'; // The role ID for exhibitor

    try {
      // Update User Role to 'Exhibitor'
      const roleUpdateResponse = await fetch(`http://localhost:5000/userRole/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ RoleName: exhibitorRole }),
      });

      if (!roleUpdateResponse.ok) {
        const errorData = await roleUpdateResponse.json();
        setError(errorData.message || 'Failed to update user role');
        return;
      }

      // Update localStorage role
      const updatedUser = { ...user, role: exhibitorRole };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Send data to the Company API to create a company
      const companyFormData = new FormData();
      companyFormData.append('user_id', userId);;
      companyFormData.append('title', CompanyTitle);
      companyFormData.append('description', CompanyDescription);
      companyFormData.append('companyImage', CompanyImage);

      const companyResponse = await fetch("http://localhost:5000/company", {
        method: "POST",
        body: companyFormData,
      });

      if (!companyResponse.ok) {
        const errorData = await companyResponse.json();
        setError(errorData.message || 'Failed to create company');
        return;
      }

      const companyData = await companyResponse.json();
      const companyId = companyData.data._id;  // Assuming the response contains the company ID

      // Send data to the Exhibitor API
      const exhibitorFormData = new FormData();
      exhibitorFormData.append('company_id', companyId);  // Use the company ID from the previous response
      exhibitorFormData.append('user_id', userId);  // Use the company ID from the previous response
      exhibitorFormData.append('contact', ExhibitorContact);
      exhibitorFormData.append('exhibitorImage', ExhibitorImage);

      const exhibitorResponse = await fetch("http://localhost:5000/exhibitors", {
        method: "POST",
        body: exhibitorFormData,
      });

      if (!exhibitorResponse.ok) {
        const errorData = await exhibitorResponse.json();
        setError(errorData.message || 'Failed to create exhibitor');
        return;
      }

      setSuccess('Exhibitor registered successfully!');
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(error);
      setError('An error occurred while registering exhibitor.');
    }
  };

  if (!isLoggedIn) {
    return null; // If user is not logged in, do not render the form.
  }

  return (
    <div
      className="mt-5 d-flex mb-5 justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <div className="container shadow-lg p-5" style={{ maxWidth: "550px" }}>
        <h2 className="modal-title text-center  mb-4">
          Exhibitor Registration
        </h2>

        {Error && <div className="alert alert-danger">{Error}</div>}
        {Success && <div className="alert alert-success">{Success}</div>}

        <form onSubmit={handleSubmit} className="form-contact contact_form">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="CompanyTitle"
              placeholder="Company Title"
              value={formData.CompanyTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Company Logo Upload */}
          <FileInput
            label="Company Logo"
            previewImage={formData.previewCompanyImage}
            onImageChange={(e) => handleImageChange(e, "CompanyImage")}
          />

          <div className="mb-3">
            <textarea
              className="form-control"
              name="CompanyDescription"
              placeholder="Company Description"
              value={formData.CompanyDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="ExhibitorContact"
              placeholder="Exhibitor Contact Information"
              value={formData.ExhibitorContact}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Exhibitor Image Upload */}
          <FileInput
            label="Exhibitor Image"
            previewImage={formData.previewExhibitorImage}
            onImageChange={(e) => handleImageChange(e, "ExhibitorImage")}
          />
          <div className="text-center">
            <button type="submit" className="btn3">
              Register as Exhibitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExhibitorRegister;
