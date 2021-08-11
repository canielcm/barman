import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../context/AuthContext";
import firebase from "firebase/app";
import "./styles.css";
import { db } from "../../firebase-config";
export const Register = () => {
  const history = useHistory();
  const { login, signup, currentUser } = useAuth();
  const [validation, setValidation] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    birthdate: "",
    ratings: [],
  });
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.password == password.confirmPassword) {
        await signup(user.email, user.password);
        await login(user.email, user.password);
        // await db.collection("users").add({
        //   name: user.name,
        //   lastName: user.lastName,
        //   email: user.email,
        //   birthdate: user.birthdate,
        //   ratings: user.ratings
        // });
        let id=await  firebase.auth().currentUser.uid
        await db.collection("users").doc(id).set({
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          birthdate: user.birthdate,
          ratings: user.ratings,
        });
        history.push("/");
        // window.location.href = await window.location.href;
      } else setPasswordMatch(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setPassword({ ...password, [name]: value });

    try {
      var currentDate = new Date();
      var mydate = new Date(user.birthdate);
      var validYear = currentDate.getFullYear() - 18;
    } catch (error) {
      console.log(error);
    }

    setValidation(false);
    if (
      user.email !== "" &&
      user.lastName !== "" &&
      user.name !== "" &&
      mydate.getFullYear() < validYear
    ) {
      setValidation(true);
    }
  };
  return (
    <div className="RegisterDiv">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">
          <strong>Create your account</strong>
        </h3>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="type your name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput" className="mb-5">
                name
              </label>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="type your last name"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput" className="mb-5">
                Lastname
              </label>
            </div>
          </div>
        </div>
        <div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="type your E-mail"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput" className="mb-5">
              Email address
            </label>
          </div>
        </div>
        <div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="type your password"
              name="password"
              value={password.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput" className="mb-5">
              Password
            </label>
          </div>
        </div>
        <div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="type your password again"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput" className="mb-5">
              Type password again
            </label>
          </div>
        </div>
        <div>
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              name="birthdate"
              value={user.birthdate}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput" className="mb-5">
              Date of birthday
            </label>
          </div>
          <span>
            <small>
              <em>
                *Remenber that
                <span className="text-danger"> you must be of legal age</span>.
                (+18)
              </em>
            </small>
          </span>
        </div>
        <input
          type="submit"
          value="Submit"
          className="btn btn-danger w-100 p-2"
          disabled={!validation}
        />
        {passwordMatch && (
          <div className="alert alert-danger">Passwords don't match</div>
        )}
      </form>
    </div>
  );
};
