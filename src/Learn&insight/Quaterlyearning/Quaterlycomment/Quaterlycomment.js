import React, { useState } from "react";
import './Quaterlycomment.css'
import { API_BASE_URL } from "../../../config";
import Cookies from "js-cookie";

const Quaterlycomment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",

    comment: "",
    saveDetails: false,
  });
const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     const errors = {};
  if (!formData.name.trim()) errors.name = "Name is required.";
  if (!formData.email.trim()) errors.email = "Email is required.";
  if (!formData.comment.trim()) errors.comment = "Comment is required.";

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  setFormErrors({}); // Clear previous errors

     // Log form data
    const token = Cookies.get("jwtToken");
    if (!token) {
      console.error("Token is missing. Ensure the user is logged in.");
      alert("Authentication token is missing. Please log in again.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/ipocomments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token for authentication
        },
        body: JSON.stringify(formData),
      });

       // Log response status
      if (response.ok) {
        alert("Comment submitted successfully!");
        setFormData({
          name: "",
          email: "",
          website: "",
          comment: "",
          saveDetails: false,
        });
      } else {
        const errorData = await response.json();
        console.error("API error response:", errorData); // Log error response
        alert("Failed to submit comment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error); // Log error
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="allcommentearn">
      <h2 className="ipocomment-title">Leave a Comment</h2>
      <p className="ipocomment-subtitle">
        Your email address will remain private. Fields marked with * are
        mandatory.
      </p>
      <div className="comment-containerearn">
        <form className="ipocomment-form" onSubmit={handleSubmit}>
          <div className="iponameemailall">
            <div className="ipocommentt-group">
              <label htmlFor="name">Name*</label>
              <br />
              <input
                type="text"
                id="name"
                placeholder="Type here"
                value={formData.name}
                onChange={handleChange}
                required
              />
               {formErrors.name && <p className="error-text">{formErrors.name}</p>}
            </div>
            <div className="ipocommentt-group">
              <label htmlFor="email">Email*</label>
              <br />
              <input
                type="email"
                id="email"
                placeholder="Type here"
                value={formData.email}
                onChange={handleChange}
                required
              />
               {formErrors.email && <p className="error-text">{formErrors.email}</p>}
            </div>
          </div>
          
          <div className="ipocomment-group">
            <label htmlFor="comment">Comment*</label>
            <textarea
              id="comment"
              placeholder="Comment here"
              value={formData.comment}
              onChange={handleChange}
              required
            ></textarea>
              {formErrors.comment && <p className="error-text">{formErrors.comment}</p>}
          </div>
        
          <button type="submit" className="earncomment-button">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quaterlycomment;
