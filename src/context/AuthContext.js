import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
import firebase from "firebase/app";
import { useHistory } from "react-router";
import axios from "axios";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({});
  const history = useHistory();
  let uData;

  const getCurrentUserAndToken = () => {
    let myToken = localStorage.getItem("token");
    let myUserData = localStorage.getItem("userData");
    myUserData = JSON.parse(myUserData);
    setCurrentUser(myUserData);
    setUserData(myUserData);
    setToken(myToken);
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = async (email, password) => {
    try {
      const urlLogin = "http://localhost:8000/api/auth/login";
      const body = {
        email: email,
        password: password,
      };
      let logindata = await axios.post(urlLogin, body);
      logindata = logindata.data;
      console.log(logindata);
      if (logindata.access_token) {
        const urlMe = "http://localhost:8000/api/auth/me";
        const bodyParameters = {
          key: "value",
        };
        const config = {
          headers: {
            Authorization: `Bearer ${logindata.access_token}`,
          },
        };
        let me = await axios.post(urlMe, bodyParameters, config);
        me = me.data;
        localStorage.setItem("userData", JSON.stringify(me));
        localStorage.setItem("token", logindata.access_token);
        console.log("User Data", userData);
        console.log("currenteUser", currentUser);
        getCurrentUserAndToken();
      }
    } catch (error) {
      console.log("login (AuthContext)", error);
    }
  };
  // const login = (email, password) => {
  //   return auth.signInWithEmailAndPassword(email, password);
  // };

  const logout = async () => {
    try {
      const urlLogout = "http://localhost:8000/api/auth/logout";
      const bodyParameters = {
        key: "value",
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let logoutData = await axios.post(urlLogout, bodyParameters, config);
      logoutData = logoutData.data;
      console.log(logoutData);
      if (logoutData.message) {
        localStorage.clear();
        getCurrentUserAndToken();
        history.push("/menu");
        console.log("logout success");
      }
    } catch (error) {
      console.log("logout (AuthContext): ", error);
      localStorage.clear();
      getCurrentUserAndToken();
      history.push("/menu");
      console.log("Token expired");
    }
  };
  // const logout = () => auth.signOut();

  const getUserData = async () => {
    try {
      return userData;
    } catch (error) {
      console.log("getUserData (AuthContext): ");
      return null;
    }
  };
  // const getUserData = async () => {
  //   let data;
  //   const evt = [];
  //   let userData;
  //   if (currentUser) {
  //     let email = String(currentUser.email);
  //     try {
  //       data = await db.collection("users").where("email", "==", email).get();
  //       const snapshot = await data;
  //       let temp;
  //       snapshot.forEach((element) => {
  //         temp = element.data();
  //         temp.id = element.id;
  //         evt.push(temp);
  //       });
  //       evt.map((element) => {
  //         userData = element;
  //       });
  //     } catch (error) {
  //       console.log("Where error here: ", error);
  //     }
  //   } else userData = null;

  //   return userData;
  // };
  const updateUserData = async (newUser) => {
    try {
      await setUserData(newUser);
      await db.collection("users").doc(currentUser.uid).update(newUser);

      console.log("updateUserData success");
    } catch (error) {
      console.log("error updatedUSerData", error);
    }
  };
  const updateUserEmail = async (newEmail) => {
    try {
      await firebase.auth().currentUser.updateEmail(newEmail);
      await console.log("update success");
    } catch (error) {
      console.log("We have problems: ", error);
    }
  };
  const updateUserPassword = async (newPassword) => {
    try {
      await firebase.auth().currentUser.updatePassword(newPassword);
      await console.log("Password update success");
    } catch (error) {
      console.log("error updating password", error);
    }
  };
  useEffect(async () => {
    console.log("userEffect AuthContext");
    let userLocal = localStorage.getItem("userData");
    let currentUserData = JSON.stringify(currentUser);
    if (userLocal != currentUserData) {
      await getCurrentUserAndToken();
    }
    console.log(await userData);
  }, [currentUser]);
  // const value = {
  //   signup,
  //   login,
  //   logout,
  //   currentUser,
  //   userData,
  //   updateUserEmail,
  //   updateUserData,
  // };
  const value = useMemo(() => {
    return {
      signup,
      login,
      logout,
      currentUser,
      userData,
      updateUserEmail,
      updateUserData,
      updateUserPassword,
    };
  }, [currentUser, userData]);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
