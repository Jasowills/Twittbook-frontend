import React from "react";
import SignupForm from "../components/SignupForm";
import "../styles/index.css";

function Signup({ handleCloseModal }) {
  return (
    <div className="modal-container">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Sign Up </h3> <p>It's quick and easy.</p>
            <button type="button" className="close" onClick={handleCloseModal}>
              <span aria-hidden="true">&times;</span>
            </button>
            <hr />
          </div>
          <div className="modal-body">
            {/* Add your signup form or content here */}
            {/* Signup form components */}
            <SignupForm handleCloseModal={handleCloseModal} />{" "}
          </div>
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
            &nbsp;
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
