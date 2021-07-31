import React, { useEffect } from "react";
import "./styles.css";
import { useParams, useHistory } from "react-router";
import { DrinkContainer, Sidebar, Carousel } from "..";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
export const MenuBox = () => {
  const { getDrinksBy } = useDrinkMethods();
  const { id } = useParams();
  let history = useHistory();
  let nameTitle = String(id).charAt(0).toUpperCase() + "" + String(id).slice(1);
  let category;
  useEffect(async () => {
    let vecDrinks = await getDrinksBy("category", String(id));
    if ((await vecDrinks.length) == 0) {
      history.push("/menu");
      category = "";
      console.log("category es null");
    } else {
      category = String(id);
      console.log("category: ", id);
    }
  }, [id]);
  return (
    <div className="MenuBoxDiv">
      <Carousel />
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <Sidebar position="outside" />
          </div>
          <div className="col-md-12 col-lg-8">
            <div className="d-flex">
              <h3 className="menuTitle">
                {id ? String(nameTitle) : "All our drinks"}
              </h3>
            </div>
            {category != "" ? (
              <DrinkContainer category={id} />
            ) : (
              <DrinkContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
