import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";
export const UserSettings = () => {
  const { userData, updateUserData, currentUser, getCurrentUserAndToken } =
    useAuth();

  const [controller, setController] = useState(0);
  const [status, setStatus] = useState(0);
  const [uData, setUData] = useState(userData);
  const [passwords, SetPasswords] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [valid, setValid] = useState(true);
  const stylesVec1 = [
    { background: "#e12c2c", color: "white" },
    { background: "white", color: "rgb(26, 24, 43)" },
  ];
  const stylesVec2 = [
    { background: "white", color: "rgb(26, 24, 43)" },
    { background: "#e12c2c", color: "white" },
  ];
  const handleChange = (e) => {
    setUData({
      ...uData,
      [e.target.name]: e.target.value,
    });
    SetPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (passwords.passwordConfirmation == passwords.password) {
      console.log(passwords.passwordConfirmation, passwords.password);
      let newPassWord = String(passwords.password);
      if (passwords.password != "") {
        await updateUserData({
          password: newPassWord,
        });
      }
      setValid(true);
    } else setValid(false);
  };
  const updateUser = async (e) => {
    e.preventDefault();
    console.log(currentUser.uid);
    try {
      await updateUserData({
        name: uData.name,
        lastname: uData.lastname,
        email: uData.email,
      });
      let counter = controller + 1;
      setController(counter);
      let newUserData = userData;
      newUserData.name = uData.name;
      newUserData.lastname = uData.lastname;
      newUserData.email = uData.email;

      localStorage.setItem("userData", JSON.stringify(newUserData));
      await getCurrentUserAndToken();
    } catch (error) {
      console.log(error);
    }
  };

  const vecOptions = [
    <div className="UserInfoForm">
      {userData && (
        <form>
          <div>
            <div className="row FormRow">
              <div className="col-md-6 UserInfoFormElement">
                <input
                  id="inputName"
                  type="text"
                  className="form-control"
                  name="name"
                  value={uData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 UserInfoFormElement">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={uData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 UserInfoFormElement">
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={uData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex flex-row-reverse bd-highlight">
              <button
                type="submit"
                disabled={false}
                className="btn btn-primary py-3 px-5"
                onClick={updateUser}
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      )}
    </div>,
    <div className="PasswordDiv">
      {uData && (
        <form onSubmit={onSubmit}>
          <h4>
            <strong>Cambiar Contraseña</strong>
          </h4>
          <div className="row FormRow">
            <div className="col-md-12 row">
              <div className="col-md-6 passwordFormElement">
                <label>
                  <span>Nueva contraseña</span>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-6 passwordFormElement">
                <label>
                  <span>Re-escribir nueva contraseña</span>
                  <input
                    type="password"
                    className="form-control"
                    name="passwordConfirmation"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          {!valid && (
            <div className="alert alert-danger" role="alert">
              Las contraseñas no coinciden, por favor intente de nuevo
            </div>
          )}
          <div>
            <div className="d-flex flex-row-reverse bd-highlight">
              <button type="submit" className="btn btn-primary  py-3 px-5">
                Guardar
              </button>
            </div>
          </div>
        </form>
      )}
    </div>,
    <div>Notificaciones</div>,
  ];
  const ToChange1 = () => {
    setStatus(0);
  };
  const ToChange2 = () => {
    setStatus(1);
  };
  useEffect(async () => {
    console.log("loops");
    let data = await userData;
    setUData(await data);
  }, [controller]);
  return (
    <div className="UserSettingsDiv">
      <div className="container">
        <h3>
          <strong>Mi cuenta</strong>
        </h3>
        <div className="row">
          <div className="col-md-3">
            <div className="OptionsContainer">
              <div className="OptionElement UserInfoElement">
                <button
                  className="UserInfoButton btn fs-5"
                  style={{
                    color: `${stylesVec1[status].color}`,
                    backgroundColor: `${stylesVec1[status].background}`,
                  }}
                  onClick={ToChange1}
                >
                  Información personal
                </button>
              </div>
              <div className="OptionElement PasswordElement">
                <button
                  className="PasswordButton btn fs-5"
                  onClick={ToChange2}
                  style={{
                    color: `${stylesVec2[status].color}`,
                    backgroundColor: `${stylesVec2[status].background}`,
                  }}
                >
                  Contraseñas
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9 FormsContainerDiv">
            <div>
              {<div className="FormsContainer">{vecOptions[status]}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
