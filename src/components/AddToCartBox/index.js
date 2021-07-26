import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { PriceBox, StarRating } from "..";
export const AddToCartBox = (props) => {
  const { getPricePerAmount } = useDrinkMethods();
  const [amount, setAmount] = useState(1);
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

  return (
    <div className="AddToCartBoxDiv">
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
            <span className="text-muted">Unit price:</span>
            <PriceBox
              price={props.drink.price}
              discount={props.drink.discount}
            />

            <label className="form-check-label text-muted">
              Quantity to buy
            </label>
            <br />
            <div className="d-flex">
              <input
                className="form-number-input form-control w-50"
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
                  )}{" "}
                  €
                </span>
              </div>
            </div>

            <button
              type="button"
              id="liveToastBtn"
              className="btn btn-primary mt-3"
            >
              <strong>Add to cart</strong>
            </button>
            <button type="button" className="btn btn-danger mt-3">
              <strong>Buy now</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
