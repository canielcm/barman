import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./styles.css";
import { CartItem } from "..";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { useAuth } from "../../context/AuthContext";
export const CartList = () => {
  const [vecCart, setVecCart] = useState([]);
  const { getUserCart, cartControl } = useDrinkMethods();
  const { userData } = useAuth();
  const history = useHistory();

  const fillVecCart = async () => {
    if (userData) {
      const data = await getUserCart(userData.id);
      console.log("imprimiento data: ", await data);
      if (data && data.drinks != vecCart) {
        setVecCart(await data.drinks);
      }
      console.log("imprimiento VecCart: ", await vecCart);
    }
  };
  useEffect(async () => {
    await fillVecCart();
  }, [userData, cartControl]);

  return (
    <div className="CartListDiv">
      <div className="container">
        <div className="drinkList">
          {vecCart.length > 0 ? (
            vecCart.map((e, index) => {
              return <CartItem key={index} drink={e} />;
            })
          ) : (
            <div className="text-center py-5">
              <h2>
                <strong>Here It's gonna appear your cart info.</strong>
              </h2>
            </div>
          )}
        </div>
        {vecCart.length > 0 ? (
          <button className="btn btn-danger-shadow w-100 mt-3">
            <strong>BUY ALL</strong>
          </button>
        ) : (
          <button
            className="btn btn-danger-shadow w-100 mt-3"
            onClick={() => history.push("/")}
          >
            <strong>GO TO SHOP!</strong>{" "}
          </button>
        )}
      </div>
    </div>
  );
};
