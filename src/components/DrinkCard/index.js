import React from "react";
import { StarRating, PriceBox } from "..";
import "./styles.css";
import { Link } from "react-router-dom";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";

export const DrinkCard = (props) => {
  const {getDiscount}=useDrinkMethods();
  let currentPrice=getDiscount(props.drink.price, props.drink.discount);
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
          <PriceBox discount={props.drink.discount} price={props.drink.price} />
          </div>
          <button type="submit" className="btn btn-primary submit w-100">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
