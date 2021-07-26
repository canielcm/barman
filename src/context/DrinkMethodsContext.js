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
  const [categoryList, setCategoryList] = useState([]);
  const [uEffectControl, setUEffectControl] = useState(0);
  const [getByParams, setGetByParams] = useState(['category','wisky']);
  const [drinkListOS, setDrinkListOS] = useState([]);
  const increaseUFC = () => {
    let counter = uEffectControl + 1;
    setUEffectControl(counter);
  };
  const getCategories = () => {
    try {
      db.collection("categories").onSnapshot((snapshot) => {
        const evt = [];
        let temp;
        snapshot.forEach((element) => {
          temp = element.data();
          temp.id = element.id;
          evt.push(temp);
        });
        setCategoryList(evt);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getData = () => {
    try {
      db.collection("drinks").onSnapshot((snapshot) => {
        const evt = [];
        let temp;
        snapshot.forEach((element) => {
          temp = element.data();
          temp.id = element.id;
          evt.push(temp);
        });
        setDrinkList(evt);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getDrinksBy = async (key, value) => {
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
  const getDrinksByOS = async () => {
    let params=[...getByParams];
    const drinks = [];
    try {
      db.collection("drinks")
        .where(params[0], "==", params[1])
        .onSnapshot((data) => {
          const snapshot = data;
          let temp;
          snapshot.forEach((element) => {
            temp = element.data();
            temp.id = element.id;
            drinks.push(temp);
          });
          setDrinkListOS(drinks);
        });
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
      var drinkData = await data.data();
      drinkData.id = id;
      return drinkData;
    } catch (error) {
      console.log(error);
    }
  };
  const getDiscount = (price, discountPercentage) => {
    let currentPrice;
    if (discountPercentage > 0) {
      let discountAmount = (price * discountPercentage) / 100;
      currentPrice = price - discountAmount;
      currentPrice = currentPrice.toFixed(2);
    } else currentPrice = price;
    return currentPrice;
  };
  const getPricePerAmount = (price, discountPercentage, amount) => {
    let currentPrice = getDiscount(price, discountPercentage);
    let TotalPrice = currentPrice * amount;
    TotalPrice = TotalPrice.toFixed(2);
    return TotalPrice;
  };
  useEffect(async () => {
    await getData();
    await getDrinksByOS();
    await getCategories();
    if (uEffectControl < 1) {
      increaseUFC();
    }
  }, [uEffectControl]);
  const value = useMemo(() => {
    return {
      drinkList,
      getDrinkData,
      getDrinksBy,
      getDiscount,
      getPricePerAmount,
      drinkListOS,
      setGetByParams,
      categoryList
    };
  }, [drinkList, drinkListOS, categoryList]);
  return (
    <DrinkMethodsContext.Provider value={value}>
      {props.children}
    </DrinkMethodsContext.Provider>
  );
};
