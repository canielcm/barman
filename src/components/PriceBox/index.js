import React from "react";
import "./styles.css";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
export const PriceBox = (props) => {
  const { getDiscount } = useDrinkMethods();
  const currentePrice = getDiscount(props.price, props.discount);
  return (
    <div className="PriceBoxDiv">
      <div className="price-box special-price price">
        {props.discount > 0 ? (
          <>
            <span className="price price-before">
              <del>{props.price} € </del>
            </span>
            <span className="price price-now">{currentePrice} €</span>
          </>
        ) : (
          <>
            <span className="price price-now">{props.price} €</span>
          </>
        )}
      </div>
    </div>
  );
};
