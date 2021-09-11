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
import { config } from "@fortawesome/fontawesome-svg-core";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({});
  const [roles, setRoles] = useState([]);
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

  const signup = async (user) => {
    try {
      const urlRegister = "http://localhost:8000/api/auth/register";
      await axios.post(urlRegister, user);
    } catch (error) {
      console.log(error);
    }
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
      const urlUpdate = `http://localhost:8000/api/auth/update/${currentUser.id}`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(urlUpdate, newUser, config);
      console.log("updateUserData success");
    } catch (error) {
      console.log("error updatedUSerData", error);
    }
  };
 
  const getRoles = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const urlMe = `http://localhost:8000/api/auth/me`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const Me = await axios.post(urlMe, {}, config);
        const MeData = Me.data;
        const urlRoles = `http://localhost:8000/api/auth/roles/${MeData.id}`;

        const vecRoles = await axios.get(urlRoles, config);
        const vecRolesData = await vecRoles.data;
        console.log("vecRolesData in getRoles: ", vecRolesData);
        console.log("vecRolesData in getRoles: ", vecRolesData);
        setRoles(vecRolesData);
      } else {
        setRoles([]);
      }
    } catch (error) {
      console.log("getRoles (AuthContext): ", error);
    }
  };
  // const getRoles = async (id) => {
  //   try {
  //     if (currentUser) {
  //       console.log("id: ", id);
  //       const token = localStorage.getItem("token");
  //       const urlRoles = `http://localhost:8000/api/auth/roles/${id}`;
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       const vecRoles = await axios.get(urlRoles, config);
  //       const vecRolesData = await  vecRoles.data;
  //       console.log("vecRolesData in getRoles: ",vecRolesData);
  //       setRoles(vecRolesData);
  //     } else {
  //       setRoles([]);
  //     }
  //   } catch (error) {
  //     console.log("id: ", id);
  //     console.log("getRoles (AuthContext): ", error);
  //   }
  // };
  const isAdmin = () => {
    let adminChecker = false;
    roles.forEach((e) => {
      console.log("element foreach: ", e);
      if (e.name == "admin") {
        adminChecker = true;
      }
    });
    return adminChecker;
  };
  useEffect(async () => {
    console.log("userEffect AuthContext");
    let userLocal = localStorage.getItem("userData");
    let currentUserData = JSON.stringify(currentUser);
    if (userLocal != currentUserData) {
      await getCurrentUserAndToken();
    }

    if (currentUser) {
      await getRoles();
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log("roles: ", roles);
    }
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
      updateUserData,
      roles,
      isAdmin,
      getCurrentUserAndToken
    };
  }, [currentUser, userData, roles]);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
