import React, { useEffect, useState } from "react";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { useAuth } from "../../context/AuthContext";
export const PurchaseItems = () => {
  const { getPurchases } = useDrinkMethods();
  const { currentUser } = useAuth();
  const [purchases, setPuerchases] = useState([]);
  const [controller, setController] = useState(0);
  useEffect(async () => {
    let vecPurchases = await getPurchases(currentUser.id);
    console.log("vecPurchases: ", vecPurchases);
    if (controller < 2) {
      setController(controller + 1);
      setPuerchases(await vecPurchases);
    }

    console.log("purchases: ", purchases);
  }, [controller]);
  return (
    <div className="container">
      <div className="title text-center">
        <h4>These are your purchases</h4>
      </div>
      <div>
        {purchases.length > 0 &&
          purchases.map((element, index) => {
            return (
              <div key={index} className="m-3">
                <div className="invoiceHeader text-center text-light bg-dark m-2 p-3">
                  <div>
                    <span>
                      <strong className="text-muted">Invoice Number:</strong>
                      {element.purchase_id}
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong className="text-muted">Date: </strong>
                      {element.purchase_date.split("T")[0]}
                    </span>
                    <br />
                    <span>
                      <strong className="text-muted">Time:</strong>

                      {element.purchase_date.split("T")[1].split(".")[0]}
                    </span>
                  </div>
                </div>
                <div className="invoiceHeader card-shadow card">
                  {element.purchases.map((element) => {
                    return (
                      <div key={element.drink_id}>
                        <img src={element.urlimg} width={50} />
                        {element.name}{" "}
                        <strong className="text-muted">
                          x {element.amount}
                        </strong>
                      </div>
                    );
                  })}
                </div>
                <div className="invoiceFooter btn-danger text-center">
                  <strong className="text-muted">Total: </strong>{" "}
                  {element.total}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
