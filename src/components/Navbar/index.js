import React, { useEffect, useState, ProfileTimeline } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWineGlassAlt,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export const Navbar = () => {
  const { currentUser, logout, userData } = useAuth();
  const [uEffectControl, setUEffectControl] = useState(0);
  const increaseUFC = () => {
    let counter = uEffectControl + 1;
    setUEffectControl(counter);
  };
  const navItens = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
  ];
  
  const SignOut = async () => {
    try {
      await logout();
      console.log(await "logout success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    if (uEffectControl < 1) {
      await increaseUFC();
    }
    console.log(userData);
  }, [uEffectControl, currentUser]);
  return (
    <>
      <div
        className="TopBarDiv d-flex justify-content-between"
        id="TopBarDivId"
      >
        <span>My Drinks</span>
        <span>
          <strong>Find all drinks you want here!</strong>
        </span>
        <span>mydrinks@hola.co</span>
      </div>
      {/* ************************Navbar***************************** */}
      <div className="NavbarDiv sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid ">
            <Link className="navbar-brand MyDinksBrand" to="/">
              <strong>
                <FontAwesomeIcon className="MyIcon " icon={faWineGlassAlt} />
                <span className="ms-2">My Drinks</span>
              </strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {navItens.map((element, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to={element.path}
                      >
                        <strong>{element.name}</strong>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2 SearchInput"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-danger me-2 px-3"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
              {!currentUser ? (
                <button
                  type="button"
                  className="btn btn-primary me-1 signOptions"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Sign In
                </button>
              ) : (
                <ul className="navbar-nav me-5 mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link dropdown-toggle dropUserOptions"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {!userData ? (
                        <>loading... !</>
                      ) : (
                        <>
                          <div className="UserNameDiv">
                            <strong className="fs-6 UserName me-1">
                              {userData ? userData.name : "loading..."}
                            </strong>
                          </div>
                          <div>
                            <FontAwesomeIcon
                              className="userIcon"
                              icon={faUser}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <ul
                      className="dropdown-menu dropdown-menu-end dropdown-menu-dark dropdown-menu-lg-start"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <span className="dropdown-item">User options</span>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          onClick={SignOut}
                          className="btn btn-outline-danger me-1 signOptions w-100 rounded-0 border-0 "
                        >
                          <strong>Sign Out</strong>
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
