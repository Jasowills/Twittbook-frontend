import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupForm({ handleCloseModal }) {
  const [isLoading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    profilePicture: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFirstNameChange = (event) => {
    setSignupData({ ...signupData, firstName: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setSignupData({ ...signupData, lastName: event.target.value });
  };

  const handleUserNameChange = (event) => {
    setSignupData({ ...signupData, username: event.target.value });
  };

  const handleEmailChange = (event) => {
    setSignupData({ ...signupData, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setSignupData({ ...signupData, password: event.target.value });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedImageData = canvas.toDataURL("image/jpeg", 0.8);
        setSignupData({ ...signupData, profilePicture: compressedImageData });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const emailRegex = /^[^\s@']+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      setLoading(false);
      return;
    }

    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.username ||
      !signupData.email ||
      !signupData.password
    ) {
      setLoading(false);
      return;
    }

    dispatch(signup(signupData,))
      .then(() => {
        toast.success("Account creation successful. Please login to continue.");
        handleCloseModal();
      })
      .catch((error) => {
        toast.error(
          error.message || "Could not create an account. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="row g-3 pad" onSubmit={handleSubmit}>
      <div className="rower">
        <div className="form-group">
          <label className="ex-label">Firstname:</label>
          <input
            className="col-input"
            type="text"
            name="firstName"
            value={signupData.firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <div className="form-group">
          <label className="ex-label">Lastname:</label>
          <input
            className="col-input"
            type="text"
            name="lastName"
            value={signupData.lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label className="ex-label">Email:</label>
        <input
          className="ex-input"
          type="email"
          name="email"
          value={signupData.email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="rower">
        <div className="form-group">
          <label className="ex-label">Username:</label>
          <input
            className="col-input"
            type="text"
            name="username"
            value={signupData.username}
            onChange={handleUserNameChange}
            required
          />
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <div className="form-group">
          <label className="ex-label">Password:</label>
          <input
            className="col-input"
            type="password"
            name="password"
            value={signupData.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
      </div>
      <label htmlFor="profilePictureInput" className="browse-button">
        Choose Profile Picture*
      </label>
      <input
        id="profilePictureInput"
        className="choose"
        type="file"
        required
        accept="image/*"
        onChange={handleProfilePictureChange}
      />
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">
          {isLoading ? "Creating your account ...😊" : "Create Account"}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default SignupForm;
