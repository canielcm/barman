import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./styles.css";
import { CartItem } from "..";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { useAuth } from "../../context/AuthContext";
export const CartList = () => {
  const [vecCart, setVecCart] = useState([]);
  const [home, setHome] = useState({
    city: "",
    address: "",
    description: "",
  });
  const { getUserCart, cartControl, addPurchase } = useDrinkMethods();
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
  const makePurchase = async () => {
    console.log("home: ",home)
    if (home.city != "" && home.address != "") {
      const purchaseData = await addPurchase(home, userData.id);
      console.log("purchaseData: ", purchaseData);
      if (purchaseData) {
        history.push("/");
      }
    } else {
      console.log("invalid data");
    }
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setHome({ ...home, [name]: value.toUpperCase() });
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
          <div>
            <button
              className="btn btn-danger-shadow w-100 mt-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#buyingModal"
            >
              <strong>BUY ALL</strong>
            </button>
            <div
              className="modal fade"
              id="buyingModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Delivery addrees
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="container">
                      <input
                        className="form-control mb-3"
                        type="text"
                        name="city"
                        id="city"
                        placeholder="city"
                        onChange={handleChanges}
                        value={home.city}
                      />
                      <input
                        className="form-control mb-3"
                        type="text"
                        name="address"
                        id="address"
                        placeholder="address"
                        onChange={handleChanges}
                        value={home.address}
                      />
                      <textarea
                        className="form-control mb-3"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="description"
                        onChange={handleChanges}
                        value={home.description}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn-danger-shadow btn"
                      onClick={makePurchase}
                      data-bs-dismiss="modal"
                    >
                      buy now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
