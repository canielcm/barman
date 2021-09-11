import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { db } from "../firebase-config";
import axios from "axios";
const DrinkMethodsContext = createContext();
export const useDrinkMethods = () => useContext(DrinkMethodsContext);

export const DrinkMethodsProvider = (props) => {
  const [token, setToken] = useState("");
  const [drinkList, setDrinkList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [uEffectControl, setUEffectControl] = useState(0);
  const [getByParams, setGetByParams] = useState(["category", "wisky"]);
  const [drinkListOS, setDrinkListOS] = useState([]);
  const increaseUFC = () => {
    let counter = uEffectControl + 1;
    setUEffectControl(counter);
  };
  const getCategories = async () => {
    try {
      const categories = await axios.get(
        "http://localhost:8000/api/categories"
      );
      const categoriesData = categories.data;
      setCategoryList(categoriesData);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      let data = await axios.get("http://localhost:8000/api/drinks");
      let dataList = data.data;
      setDrinkList(dataList);
    } catch (error) {
      console.log(error);
    }
  };

  const getDrinksBy = async (value) => {
    try {
      const drinks = await axios.get(
        `http://localhost:8000/api/drinks/category/${value}`
      );
      const drinkData = drinks.data;
      return drinkData;
    } catch (error) {
      console.log("Where error here: ", error);
      return null;
    }
  };

  const getDrinksByOS = () => {
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
    try {
      let data = await axios.get(`http://localhost:8000/api/drinks/${id}`);
      let drinkData = data.data;
      return drinkData[0];
    } catch (error) {
      console.log("getDrinkData says", error);
    }
  };

  const addDrink = async (drink) => {
    try {
      const token = localStorage.getItem("token");
      const urlDrink = "http://localhost:8000/api/drinks";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(urlDrink, drink, config);
      await getData();
    } catch (error) {
      console.log("addDrink DrinkMethods says: ", error);
    }
  };
  const updateDrink = async (drink, id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("update metho: drink ", drink);
      console.log("update metho: id ", id);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://localhost:8000/api/drinks/${id}`, drink, config);
      await getData();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDrink = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:8000/api/drinks/${id}`, config);
      await getData();
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

  /* *********************Cart Methods******************** */
  const [cartControl, setCartControl] = useState(0);
  const updateCartControl = () => {
    let counter = cartControl + 1;
    setCartControl(counter);
  };
  const getUserCart = async (id) => {
    try {
      const urlCart = `http://localhost:8000/api/carts/${id}`;
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const cart = await axios.get(urlCart, config);
      const cartData = cart.data;
      return cartData;
    } catch (error) {
      console.log(error);
    }
  };

  const removeToCart = async (id, idDrink) => {
    try {
      const token = localStorage.getItem("token");
      const urlCartDelete = `http://localhost:8000/api/carts/${id}/${idDrink}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const cart = await axios.delete(urlCartDelete, config);
    } catch (error) {
      console.log("removeToCart error says", error);
    }
  };

  const addToCart = async (id, idDrink, amount) => {
    try {
      const urlAdd = "http://localhost:8000/api/carts";
      const token = localStorage.getItem("token");
      const body = {
        user_id: id,
        drink_id: idDrink,
        amount: amount,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const cart = await axios.post(urlAdd, body, config);
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
  /* ************************HOME METHODS************************ */
  const addPurchase = async (home, id) => {
    try {
      const urlHome = "http://localhost:8000/api/homes";
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const homeRq = await axios.post(urlHome, home, config);
      const homeData = await homeRq.data;
      console.log("homeData.data.id", homeData.data.id);
      const urlPurchase = `http://localhost:8000/api/purchases/${id}/${homeData.data.id}`;
      const purchase = await axios.post(urlPurchase, {}, config);
      return purchase.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchases = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const urlPurchase = `http://localhost:8000/api/purchases/${id}`;
      const purchase = await axios.post(urlPurchase, {}, config);
      return purchase.data;
    } catch (error) {
      console.log(error);
    }
  };

  /* ***************************************************** */
  useEffect(async () => {
    const myToken = localStorage.getItem("token");
    setToken(myToken);
    console.log("drinkmethods token: ", token);
    console.log("useEffect DrinkMethodsContext");
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
      addDrink,
      updateDrink,
      deleteDrink,
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
      addPurchase,
      getPurchases,
    };
  }, [drinkList, drinkListOS, categoryList, cartControl, crudControl]);
  return (
    <DrinkMethodsContext.Provider value={value}>
      {props.children}
    </DrinkMethodsContext.Provider>
  );
};
