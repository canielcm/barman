import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
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
      let email= String(currentUser.email)
      try {
        data = await db
          .collection("users")
          .where("email", "==", email)
          .get();
        const snapshot = await data;
        let temp;
        snapshot.forEach((element) => {
          temp = element.data();
          temp.id = element.id;
          evt.push(temp);
        });
        evt.map(element=>{
          userData=element;
        })
      } catch (error) {
        console.log("Where error here: ",error);
      }
    } else userData = null;

    return userData;
  };
  useEffect(async () => {
    console.log("userEffect AuthContext")
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    uData=await getUserData();
    await setUserData(uData)
    console.log( await userData)
  }, [currentUser]);
  const value = { signup, login, logout, currentUser, userData };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
