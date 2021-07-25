import React, { useState } from "react";
import { StarRating } from "..";
import "./styles.css";
import { Link } from "react-router-dom";

export const DrinkCard = (props) => {
  const discount = props.drink.discount;
  let price = props.drink.price;
  let discountAmount = (price * discount) / 100;
  let currentPrice = price - discountAmount;
  currentPrice = currentPrice.toFixed(2);
  return (
    <div className="DrinkCardDiv">
      <div className="card">
        <div className="cardImg">
          <Link to={"drink/"+props.drink.id} className="linkinfo">
            <img
              src={props.drink.urlimg}
              className="is card-img-top "
              alt="..."
            />
          </Link>
        </div>

        <div className="card-body">
          <Link to={"drink/"+props.drink.id} className="linkinfo">
            <div className="card-title">{props.drink.name} </div>
          </Link>
          <StarRating rating={props.drink.rating[0]} id={props.drink.id}></StarRating>
          <div className="price-box special-price price">
            {props.drink.discount > 0 ? (
              <div>
                <span className="price price-before">{props.drink.price}</span>
                <span className="price-now">{currentPrice} €</span>
              </div>
            ) : (
              <span className="price-now">{props.drink.price} €</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary submit w-100">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
