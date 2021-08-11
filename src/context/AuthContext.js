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
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({});
  let uData;
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => auth.signOut();

  const getUserData = async () => {
    let data;
    const evt = [];
    let userData;
    if (currentUser) {
      let email = String(currentUser.email);
      try {
        data = await db.collection("users").where("email", "==", email).get();
        const snapshot = await data;
        let temp;
        snapshot.forEach((element) => {
          temp = element.data();
          temp.id = element.id;
          evt.push(temp);
        });
        evt.map((element) => {
          userData = element;
        });
      } catch (error) {
        console.log("Where error here: ", error);
      }
    } else userData = null;

    return userData;
  };
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
      console.log("error updating password", error)
    }
  };
  useEffect(async () => {
    console.log("userEffect AuthContext");
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    uData = await getUserData();
    await setUserData(uData);
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
      updateUserPassword
    };
  }, [currentUser, userData]);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
