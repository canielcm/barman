import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router";
import { PriceBox, StarRating } from "..";
export const AddToCartBox = (props) => {
  const { userData } = useAuth();
  const { getPricePerAmount, addToCart } = useDrinkMethods();
  const [amount, setAmount] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();
  const handleChange = (e) => {
    let value = e.target.value;
    let vecValue = value.split(".");
    if (vecValue.length == 1) {
      if (Number(value) >= 0 && Number(value) < props.drink.amount) {
        setAmount(value);
      } else if (Number(value) >= props.drink.amount)
        setAmount(props.drink.amount);
      else setAmount(1);
    }
  };
  const showingToast = () => {
    setShowToast(true);
    setTimeout(function () {
      setShowToast(false);
    }, 3000);
  };
  return (
    <div
      className={
        props.position == "inside"
          ? "AddToCartBoxDiv"
          : "AddToCartBoxDiv card-shadow"
      }
    >
      <div
        className={
          props.position
            ? "drink-info" + " " + props.position
            : "drink-info" + " " + "outside"
        }
      >
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{props.drink.name}</h5>
            {props.drink.rating && (
              <StarRating
                id={props.drink.id}
                rating={props.drink.rating[0]}
              ></StarRating>
            )}
            <div className="my-4">
              <span className="text-muted">Unit price:</span>
              <PriceBox
                price={props.drink.price}
                discount={props.drink.discount}
              />
            </div>

            <label className="form-check-label text-muted mb-1">
              Quantity to buy:
            </label>
            <br />
            <div className="d-flex">
              <input
                className="form-number-input form-control inputAmount"
                type="number"
                value={amount}
                onChange={handleChange}
                min="1"
                max={props.drink.amount}
              />
              <div className="ms-2">
                <div>
                  <span className="text-muted">Total:</span>
                </div>
                <span className="totalPrice">
                  {Number(
                    getPricePerAmount(
                      props.drink.price,
                      props.drink.discount,
                      Number(amount)
                    )
                  )}
                  €
                </span>
              </div>
            </div>

            <button
              type="button"
              className="btn mt-3 btn-primary-shadow"
              onClick={() => {
                if (props.drink.id) {
                  showingToast();
                  addToCart(userData.id, props.drink.id, amount);
                }
              }}
            >
              <strong>Add to cart</strong>
            </button>

            <div className="position-fixed bottom-0 end-0 p-3 Toast">
              <div
                id="liveToast"
                className={!showToast ? "toast hide" : "toast show"}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-body">
                  <strong className="text-success">
                    {props.drink.name} x{amount}
                  </strong>{" "}
                  added to Cart.
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn mt-3 btn-danger-shadow"
              onClick={async () => {
                if (props.drink.id) {
                  await addToCart(userData.id, props.drink.id, amount);
                  await history.push("/cart");
                }
              }}
            >
              <strong>Buy now</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
