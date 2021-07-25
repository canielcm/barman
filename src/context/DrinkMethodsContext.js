import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { db } from "../firebase-config";
const DrinkMethodsContext = createContext();
export const useDrinkMethods = () => useContext(DrinkMethodsContext);

export const DrinkMethodsProvider = (props) => {
  const [drinkList, setDrinkList] = useState([]);
  const [uEffectControl, setUEffectControl] = useState(0);
  const increaseUFC = () => {
    let counter = uEffectControl + 1;
    setUEffectControl(counter);
  };
  const getData = async () => {
    try {
      const snapshot = await db.collection("drinks").get();
      const evt = [];
      let temp;
      snapshot.forEach((element) => {
        temp = element.data();
        temp.id = element.id;
        evt.push(temp);
      });
      setDrinkList(evt);
    } catch (error) {
      console.log(error);
    }
  };
  const getDrinksBy = async(key, value) => {
    let data;
    const drinks = [];
    let drinkData;
    try {
      data = await db.collection("drinks").where(key, "==", value).get();
      const snapshot = await data;
      let temp;
      snapshot.forEach((element) => {
        temp = element.data();
        temp.id = element.id;
        drinks.push(temp);
      });
      drinkData = drinks;
      return drinkData;
    } catch (error) {
      console.log("Where error here: ", error);
      return null;
    }
  };
  const getDrinkData = async (id) => {
    let data;
    try {
      id = String(id);
      data = await db.collection("drinks").doc(id).get();
      var drinkData = data.data();
      return drinkData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await getData();
    if (uEffectControl < 1) {
      increaseUFC();
    }
  }, [uEffectControl]);
  const value = useMemo(() => {
    return {
      drinkList,
      getDrinkData,
      getDrinksBy,
    };
  }, [drinkList]);
  return (
    <DrinkMethodsContext.Provider value={value}>
      {props.children}
    </DrinkMethodsContext.Provider>
  );
};
