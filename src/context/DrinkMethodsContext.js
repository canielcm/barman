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
  /* ************************API METHODS************************ */
  const [drinkListApi, setDrinkListApi] = useState([]);
  const [categoryListApi, setCategoryListApi] = useState([]);

  const getCategoryListApi = async () => {
    const categories = await axios.get(
      "http://localhost/Api_desarrollo_web/categorias"
    );
    setCategoryListApi(categories.data.body[0]);
  };
  const getCategoryByIdApi = async (id) => {
    try {
      const drink = await axios.get(
        `http://localhost/Api_desarrollo_web/categorias?id=${id}`
      );
      let myCategory = await drink.data.body[0];
      return myCategory;
    } catch (error) {
      console.log(error);
    }
  };
  const getDrinkListApi = async () => {
    try {
      const drinks = await axios.get(
        "http://localhost/Api_desarrollo_web/bebidas"
      );
      let drinkArray = drinks.data.body[0];
      setDrinkListApi(drinkArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getDrinkByIdApi = async (id) => {
    try {
      const drink = await axios.get(
        `http://localhost/Api_desarrollo_web/bebidas?id=${id}`
      );
      let myDrink = drink.data.body[0];
      return myDrink;
    } catch (error) {
      console.log(error);
    }
  };
  const addDrinkApi = async (drink) => {
    try {
      await axios.post("http://localhost/Api_desarrollo_web/bebidas", drink);
      await getDrinkListApi();
    } catch (error) {
      console.log(error);
    }
  };
  const updateDrinkApi = async (drink, id) => {
    try {
      console.log("update metho: drink ", drink);
      console.log("update metho: id ", id);
      let drinkData = await getDrinkByIdApi(drink.id_bebida);
      await axios.put(`http://localhost/Api_desarrollo_web/bebidas?id=${id}`, {
        cantidad: drink.cantidad,
        cod_categoria: drink.cod_categoria,
        descripcion: drink.descripcion,
        descuento: drink.descuento,
        grado_acohol: drink.grado_acohol,
        marca: drink.marca,
        nombre_bebida: drink.nombre_bebida,
        puntuacion: drinkData.puntuacion ,
        url: drink.url,
        volumen: drink.volumen,
        precio: drink.precio,
      });
      await getDrinkListApi();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDrinkApi = async (id) => {
    try {
      await axios.delete(
        `http://localhost/Api_desarrollo_web/bebidas?id=${id}`
      );
      await getDrinkListApi();
    } catch (error) {
      console.log(error);
    }
  };

  /* ***************************************************** */
  useEffect(async () => {
    console.log("useEffect DrinkMethodsContext");
    await getData();
    await getDrinksByOS();
    await getCategories();
    await getDrinkListApi();
    await getCategoryListApi();
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
      // Drink API
      drinkListApi,
      getDrinkByIdApi,
      addDrinkApi,
      updateDrinkApi,
      deleteDrinkApi,
      categoryListApi,
      getCategoryByIdApi,
    };
  }, [
    drinkList,
    drinkListOS,
    categoryList,
    cartControl,
    crudControl,
    drinkListApi,
    categoryListApi,
  ]);
  return (
    <DrinkMethodsContext.Provider value={value}>
      {props.children}
    </DrinkMethodsContext.Provider>
  );
};
