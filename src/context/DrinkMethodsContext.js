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
  // const getCategories = () => {
  //   try {
  //     db.collection("categories").onSnapshot((snapshot) => {
  //       const evt = [];
  //       let temp;
  //       snapshot.forEach((element) => {
  //         temp = element.data();
  //         temp.id = element.id;
  //         evt.push(temp);
  //       });
  //       setCategoryList(evt);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getData = async () => {
    try {
      let data = await axios.get("http://localhost:8000/api/drinks");
      let dataList = data.data;
      setDrinkList(dataList);
    } catch (error) {
      console.log(error);
    }
  };
  // const getData = () => {
  //   try {
  //     db.collection("drinks").onSnapshot((snapshot) => {
  //       const evt = [];
  //       let temp;
  //       snapshot.forEach((element) => {
  //         temp = element.data();
  //         temp.id = element.id;
  //         evt.push(temp);
  //       });
  //       setDrinkList(evt);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
  // const getDrinksBy = async (key,value) => {
  //   let data;
  //   const drinks = [];
  //   let drinkData;
  //   try {
  //     data = await db.collection("drinks").where(key, "==", value).get();
  //     const snapshot = await data;
  //     let temp;
  //     snapshot.forEach((element) => {
  //       temp = element.data();
  //       temp.id = element.id;
  //       drinks.push(temp);
  //     });
  //     drinkData = drinks;
  //     return drinkData;
  //   } catch (error) {
  //     console.log("Where error here: ", error);
  //     return null;
  //   }
  // };
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
  // const getDrinkData = async (id) => {
  //   let data;
  //   try {
  //     id = String(id);
  //     data = await db.collection("drinks").doc(id).get();
  //     var drinkData = await data.data();
  //     drinkData.id = id;
  //     return drinkData;
  //   } catch (error) {
  //     console.log("getDrinkData says", error);
  //   }
  // };
  const addDrink = async (drink) => {
    try {
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
  // const getUserCart = async (id) => {
  //   let data;
  //   try {
  //     id = String(id);
  //     data = await db.collection("cart").doc(id).get();
  //     var cartData = await data.data();
  //     cartData ? (cartData.id = id) : (cartData = null);
  //     return cartData;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  // const removeToCart = async (id, idDrink) => {
  //   try {
  //     console.log("*****************");
  //     console.log("This is the ID", id);
  //     console.log("This is the idDrink", idDrink);
  //     const cart = await getUserCart(id);
  //     const vDrinks = cart.drinks;
  //     cart.drinks.map((e, index) => {
  //       if (idDrink == e.idDrink) {
  //         vDrinks.splice(index, 1);
  //       }
  //     });
  //     await db.collection("cart").doc(id).update({
  //       drinks: vDrinks,
  //     });
  //   } catch (error) {
  //     console.log("removeToCart error says", error);
  //   }
  // };

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
  // const addToCart = async (id, idDrink, amount) => {
  //   try {
  //     console.log("This is the ID", id);
  //     console.log("This is the idDrink", idDrink);
  //     console.log("This is the amount", amount);
  //     const cart = await getUserCart(id);
  //     let temp = {
  //       idUser: id,
  //       drinks: [],
  //     };
  //     if (!cart) {
  //       await db.collection("cart").doc(id).set(temp);
  //     } else temp = await cart;
  //     let found = false;
  //     let newAmount;
  //     let vDrinks = temp.drinks;
  //     temp.drinks.map((e, index) => {
  //       let obj = e;
  //       if (obj.idDrink == idDrink) {
  //         found = true;
  //         newAmount = Number(obj.amount) + Number(amount);
  //         vDrinks[index].amount = newAmount;
  //       }
  //     });
  //     if (found) {
  //       await db.collection("cart").doc(id).update({
  //         drinks: vDrinks,
  //       });
  //     } else {
  //       let vecDrinks = temp.drinks;
  //       let drinkD = await getDrinkData(idDrink);
  //       vecDrinks.push({
  //         name: drinkD.name,
  //         idDrink: idDrink,
  //         amount: amount,
  //         urlimg: drinkD.urlimg,
  //         price: drinkD.price,
  //         discount: drinkD.discount,
  //       });
  //       await db.collection("cart").doc(id).update({
  //         drinks: vecDrinks,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("There are errors", error);
  //   }
  // };

  /* ********************CRUD***************************** */
  const [crudControl, setCrudControl] = useState(0);
  const updateCrudControl = () => {
    let counter = crudControl + 1;
    setCrudControl(counter);
  };
  /* ************************HOME METHODS************************ */
  const addPurchase = async (home, id)=>{
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
      console.log("homeData.data.id",homeData.data.id)
      const urlPurchase = `http://localhost:8000/api/purchases/${id}/${homeData.data.id}`;
      const purchase = await axios.post(urlPurchase,{},config);
      return purchase.data;
    } catch (error) {
      console.log(error);
    }
  }

  const getPurchases = async (id)=>{
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const urlPurchase = `http://localhost:8000/api/purchases/${id}`;
      const purchase = await axios.post(urlPurchase,{},config);
      return purchase.data;
    } catch (error) {
      console.log(error);
    }
  }

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
      getPurchases
    };
  }, [
    drinkList,
    drinkListOS,
    categoryList,
    cartControl,
    crudControl
  ]);
  return (
    <DrinkMethodsContext.Provider value={value}>
      {props.children}
    </DrinkMethodsContext.Provider>
  );
};
