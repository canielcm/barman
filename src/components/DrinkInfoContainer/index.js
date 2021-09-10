import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { AddToCartBox } from "..";
export const DrinkInfoContainer = () => {
  const { id } = useParams();
  const [currentDrink, setCurrentDrink] = useState({});
  const [displayInfo, setDisplayInfo] = useState(true);
  const { getDrinkData } = useDrinkMethods();
  useEffect(async () => {
    console.log("*************************************************");
    console.log("ID de la bebida", id);
    let drink = await getDrinkData(id);
    console.log("la variable: ", await drink);
    setCurrentDrink(await drink);
    console.log("el state: ", await currentDrink);
  }, []);

  return (
    <div className="DrinkInfoContainerDiv">
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="drink-select col-sm-12 col-md-7">
            <div className="card mb-3 card-shadow">
              <div className="d-flex">
                {currentDrink.urlimg && (
                  <img
                    src={currentDrink.urlimg}
                    className="card-img-top infoimg"
                    alt="..."
                  />
                )}
                <h3 className="drinkTitle">{currentDrink && currentDrink.name}</h3>
              </div>
              <div className="card-body">
                <div className="drink-info">
                  <div className="mb-3">
                    {currentDrink.id && (
                      <AddToCartBox position="inside" drink={currentDrink} />
                    )}
                  </div>
                </div>

                <button
                  className="labeldetails btn px-0 mx-0 mb-2"
                  style={
                    displayInfo
                      ? {
                          marginTop: "4%",
                          marginLeft: "1%",
                          color: "rgb(223, 63, 64)",
                        }
                      : {
                          marginTop: "4%",
                          marginLeft: "1%",
                          color: "rgb(117, 117, 117)",
                        }
                  }
                  onClick={() => setDisplayInfo(true)}
                >
                  <strong>PRODUCT DETAILS</strong>
                </button>
                <button
                  className="labeldescription btn px-0 mb-2"
                  style={
                    !displayInfo
                      ? {
                          marginTop: "4%",
                          marginLeft: "1%",
                          color: "rgb(223, 63, 63)",
                        }
                      : {
                          marginTop: "4%",
                          marginLeft: "1%",
                          color: "rgb(117, 117, 117)",
                        }
                  }
                  onClick={() => setDisplayInfo(false)}
                >
                  <strong>PRODUCT DESCRIPTION</strong>
                </button>
                {displayInfo ? (
                  <div className="details">
                    <dl className="dl-details top">
                      <dt className="dt-details" title="brand">
                        BRAND
                      </dt>
                      <dd className="dd-details">
                        <span>
                          <a className="text-muted" href="#">
                            {currentDrink && currentDrink.brand}
                          </a>
                        </span>
                      </dd>
                    </dl>

                    <dl className="dl-details">
                      <dt className="dt-details" title="category">
                        CATEGORY
                      </dt>
                      <dd className="dd-details">
                        <span>
                          <a className="text-muted" href="#">
                            {currentDrink && currentDrink.category}
                          </a>
                        </span>
                      </dd>
                    </dl>

                    <dl className="dl-details">
                      <dt className="_dt-details" title="AP">
                        ALCOHOL PERCENTAGE
                      </dt>
                      <dd className="dd-details">
                        <span className="text-muted">
                          {currentDrink && currentDrink.abv}%
                        </span>
                      </dd>
                    </dl>
                  </div>
                ) : (
                  <p className="card-text textDescription">
                    {currentDrink && currentDrink.description}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-5 col-lg-4 offset-lg-1">
            <AddToCartBox drink={currentDrink} />
          </div>
        </div>
      </div>
    </div>
  );
};
