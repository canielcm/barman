import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { AddToCartBox } from "..";
export const DrinkInfoContainer = () => {
  const { id } = useParams();
  const [currentDrink, setCurrentDrink] = useState({});
  const { getDrinkData } = useDrinkMethods();

  useEffect(async () => {
    console.log("*************************************************");
    console.log("ID de la bebida", id);
    let drink = await getDrinkData(id);
    console.log("la variable: ",await drink);
    setCurrentDrink(await drink);
    console.log("el state: ",await currentDrink);
  }, []);
  return (
    <div className="DrinkInfoContainerDiv">
      <div className="container mt-4 mb-4">
        <div className="row">
          <h3>{currentDrink && currentDrink.name}</h3>
          <div className="drink-select col-sm-12 col-md-7">
            <div className="card mb-3">
              <img
                src={
                  !currentDrink
                    ? "https://products0.imgix.drizly.com/ci-smirnoff-no-21-vodka-2b29fd1a14c47157.jpeg?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20"
                    : currentDrink.urlimg
                }
                className="card-img-top infoimg"
                alt="..."
              />
              <div className="card-body">
                <div className="drink-info">
                  <div className="mb-3">
                    {currentDrink.id && (
                      <AddToCartBox position="inside" drink={currentDrink} />
                    )}
                  </div>
                </div>
                <div className="details">
                  <label className="labeldetails">
                    <strong>PRODUCT DETAILS</strong>
                  </label>

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
                <label className="labeldescription">
                  <strong>PRODUCT DESCRIPTION</strong>
                </label>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Reiciendis iure possimus blanditiis ratione
                  reprehenderit ipsam quasi repellat placeat maxime vitae
                  consequatur rerum quis, modi ut ea sunt accusantium debitis
                  repellendus.
                </p>
              </div>
            </div>
          </div>
          <div className=" col-4 offset-1">
            <AddToCartBox drink={currentDrink} />
          </div>
        </div>
      </div>
    </div>
  );
};
