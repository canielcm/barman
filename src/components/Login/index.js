import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
export const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(userInput.email, userInput.password);
      console.log(await "LogIn success");
    } catch (error) {
      console.log(error);
      let err = String(error);
      setError(err);
      setTimeout(() => setError(null), 7000);
    }
  };
  const handleChanges = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };
  return (
    <div className="LoginDiv p-4">
      <h4 className="text-center mb-5">Login</h4>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="email"
          className="form-control mb-4"
          placeholder="Email"
          name="email"
          value={userInput.email}
          onChange={handleChanges}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          value={userInput.password}
          onChange={handleChanges}
        />
        <input
          type="submit"
          value="Log In"
          className="btn btn-primary w-100 p-3 mt-3"
          data-bs-target="#exampleModal"
        />
      </form>
      <div>
          <Link to="/register" >
              <div data-bs-dismiss="modal">
                  Sing Up
              </div>
          </Link>
      </div>
    </div>
  );
};
