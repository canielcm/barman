import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { useAuth } from "../../context/AuthContext";
import { PriceBox } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
export const CartItem = (props) => {
  const [drinkData, setDrinkData] = useState();
  const [amount, setAmount] = useState(props.drink.amount);
  const { userData } = useAuth();
  const {
    getDrinkData,
    removeToCart,
    updateCartControl,
    getPricePerAmount,
    addToCart,
  } = useDrinkMethods();
  let drinkObj;
  let drink_id;
  let drink;
  useEffect(async () => {
    if (props.drink) {
      drinkObj = props.drink;
      drink_id = props.drink.drink_id;
      drink = await getDrinkData(drink_id);
    }
    if (drink) {
      setDrinkData(drink);
    }
  }, [drink, amount]);
  return (
    <div className="CartItemDiv">
      {drinkData && (
        <div>
          <div className="bg-dark text-light ps-2 mb-1 drinkName">
            {props.drink.name}
          </div>
          <div className="d-flex flex-wrap justify-content-between">
            <div>
              <div className="d-flex flex-wrap">
                <div className="imgDiv">
                  <Link to={"/drink/"+props.drink.drink_id}>
                    <img className="imgDrink" src={props.drink.urlimg} alt="" />
                  </Link>
                </div>
                <div>
                  <div>
                    <span className="badge bg-dark">x{amount}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-danger py-0 px-2 remove-btn"
                      onClick={async () => {
                        await removeToCart(userData.id, props.drink.drink_id);
                        await updateCartControl();
                      }}
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="priceDiv mt-4">
              <div className="d-flex flex-wrap">
                <div className="input-group w-50">
                  <button
                    className="btn  py-0 px-3 btn-rem"
                    onClick={async () => {
                      await addToCart(userData.id, props.drink.drink_id, -1);
                      let count = amount - 1;
                      if (count > 0) {
                        await setAmount(count);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="span-amount">{amount}</span>
                  <button
                    className="btn py-0 px-3 btn-add"
                    onClick={async () => {
                      await addToCart(userData.id, props.drink.drink_id, 1);
                      let count = amount + 1;
                      if (count <= drinkData.amount) {
                        await setAmount(count);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <div className="w-50">
                  <span className="text-muted">Total price:</span>
                  <br />
                  <span className="total-price">
                    {getPricePerAmount(
                      props.drink.price,
                      props.drink.discount,
                      amount
                    )}{" "}
                    €
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
