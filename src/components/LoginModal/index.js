import React from "react";
import "./styles.css";
import { Login } from "..";
import { useAuth } from "../../context/AuthContext";
export const LoginModal = () => {
  const { currentUser, userData } = useAuth();
  return (
    <div className="LoginModalDiv">
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {!currentUser ? (
              <Login></Login>
            ) : (
              <div>
                {userData && (
                  <div>
                    <div className="modal-header">
                      <h5 className="modal-title">
                        <strong>Hello {userData && userData.name}!</strong>
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <h2>Welcome to My Drinks</h2>
                      <span>Enjoy our cataloge!</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
