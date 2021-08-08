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
  const [getByParams, setGetByParams] = useState(["category", "wisky"]);
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
    let params = [...getByParams];
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
      console.log("getDrinkData says", error);
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

  /* *********************Cart Methods******************** */
  const [cartControl, setCartControl] = useState(0);
  const updateCartControl = () => {
    let counter = cartControl + 1;
    setCartControl(counter);
  };
  const getUserCart = async (id) => {
    let data;
    try {
      id = String(id);
      data = await db.collection("cart").doc(id).get();
      var cartData = await data.data();
      cartData ? (cartData.id = id) : (cartData = null);
      return cartData;
    } catch (error) {
      console.log(error);
    }
  };

  const removeToCart = async (id, idDrink) => {
    try {
      console.log("*****************");
      console.log("This is the ID", id);
      console.log("This is the idDrink", idDrink);
      const cart = await getUserCart(id);
      const vDrinks = cart.drinks;
      cart.drinks.map((e, index) => {
        if (idDrink == e.idDrink) {
          vDrinks.splice(index, 1);
        }
      });
      await db.collection("cart").doc(id).update({
        drinks: vDrinks,
      });
    } catch (error) {
      console.log("removeToCart error says", error);
    }
  };
  const addToCart = async (id, idDrink, amount) => {
    try {
      console.log("This is the ID", id);
      console.log("This is the idDrink", idDrink);
      console.log("This is the amount", amount);
      const cart = await getUserCart(id);
      let temp = {
        idUser: id,
        drinks: [],
      };
      if (!cart) {
        await db.collection("cart").doc(id).set(temp);
      } else temp = await cart;
      let found = false;
      let newAmount;
      let vDrinks = temp.drinks;
      temp.drinks.map((e, index) => {
        let obj = e;
        if (obj.idDrink == idDrink) {
          found = true;
          newAmount = Number(obj.amount) + Number(amount);
          vDrinks[index].amount = newAmount;
        }
      });
      if (found) {
        await db.collection("cart").doc(id).update({
          drinks: vDrinks,
        });
      } else {
        let vecDrinks = temp.drinks;
        let drinkD = await getDrinkData(idDrink);
        vecDrinks.push({
          name: drinkD.name,
          idDrink: idDrink,
          amount: amount,
          urlimg: drinkD.urlimg,
          price: drinkD.price,
          discount: drinkD.discount,
        });
        await db.collection("cart").doc(id).update({
          drinks: vecDrinks,
        });
      }
    } catch (error) {
      console.log("There are errors", error);
    }
  };

  /* ********************CRUD***************************** */
  const [crudControl, setCrudControl] = useState(0);
  const updateCrudControl = () => {
    let counter = crudControl + 1;
    setCrudControl(counter);
  };

  /* ***************************************************** */
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
      categoryList,
      addToCart,
      getUserCart,
      removeToCart,
      cartControl,
      updateCartControl,
      crudControl,
      updateCrudControl,
    };
  }, [drinkList, drinkListOS, categoryList, cartControl, crudControl]);
  return (
    <DrinkMethodsContext.Provider value={value}>
      {props.children}
    </DrinkMethodsContext.Provider>
  );
};
