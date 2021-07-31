import React, { useState } from "react";
import { StarRating, PriceBox } from "..";
import "./styles.css";
import { Link } from "react-router-dom";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { useAuth } from "../../context/AuthContext";
export const DrinkCard = (props) => {
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useDrinkMethods();
  const { userData } = useAuth();
  const ShowingToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  return (
    <div className="DrinkCardDiv">
      <div className="card">
        <div className="cardImg">
          <Link to={"/drink/" + props.drink.id} className="linkinfo">
            <img
              src={props.drink.urlimg}
              className="is card-img-top "
              alt="..."
            />
          </Link>
        </div>

        <div className="card-body">
          <Link to={"drink/" + props.drink.id} className="linkinfo">
            <div className="card-title">{props.drink.name} </div>
          </Link>
          <StarRating
            rating={props.drink.rating[0]}
            id={props.drink.id}
          ></StarRating>
          <div className="price-box special-price price">
            <PriceBox
              discount={props.drink.discount}
              price={props.drink.price}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark submit w-100 py-0"
            onClick={() => {
              if (userData) {
                addToCart(userData.id, props.drink.id, 1);
                ShowingToast();
              }
            }}
          >
            Add to cart
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
                <strong className="text-success">{props.drink.name} x1</strong>{" "}
                added to Cart.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
