import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { DrinkCard } from "..";

export const DrinkContainer = (props) => {
  const [vecDrinks, setVecDrinks] = useState([]);
  const { drinkList, getDrinksBy } = useDrinkMethods();

  const fillVecDrinks = async () => {
    console.log("props.category: ", props.category);
    if (props.category) {
      const data = await getDrinksBy(props.category);
      if(data!=vecDrinks){
        setVecDrinks(data);
      }
    } else {
      const data = await drinkList;
      if(data!=vecDrinks){
        setVecDrinks(data);
      }
    }
  };
  useEffect(async () => {
    fillVecDrinks();
    console.log("here is de vector",vecDrinks);
  },[drinkList, props.category]);
  return (
    <div className="DrinkContainerDiv">
      <div className="container-fluid ">
        <div className="dContainer">
          {vecDrinks&&vecDrinks.map((element) => {
            return (
              <div key={element.id}>
                <DrinkCard drink={element}></DrinkCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
