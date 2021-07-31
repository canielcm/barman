import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.development";
import { db } from "../../firebase-config";
export const Sidebar = (props) => {
  const {categoryList, getDrinksBy}=useDrinkMethods();
  const [categories, setCategories]=useState([]);
  
  const LocalCategories = [
    {
      name: "Whisky",
      amount: "10",
      path: "wisky",
    },
    {
      name: "Vodka",
      amount: "23",
      path: "vodka",
    },
    {
      name: "Ron",
      amount: "21",
      path: "wine",
    },
    {
      name: "Wine",
      amount: "45",
      path: "wine",
    },
    {
      name: "Ginebra",
      amount: "34",
      path: "ginebra",
    },
    {
      name: "Cognac",
      amount: "47",
      path: "cognac",
    },
    {
      name: "Beer",
      amount: "86",
      path: "beer",
    },
    {
      name: "Tequila",
      amount: "72",
      path: "tequila",
    },
    {
      name: "Alcohol-free drinks",
      amount: "34",
      path: "alcoholfree",
    },
  ];
  const getAmountPerCategory= async ()=>{
    await categoryList.map(async (e)=>{
        await db.collection("categories").doc(e.id).update(
          {amount: 5}
        )
    })
  }
  const nameTitle = (name)=>String(name).charAt(0).toUpperCase() + "" + String(name).slice(1);
  
  useEffect(async ()=>{
    setCategories(await categoryList)
    console.log(categoryList)
  },[categoryList])
  return (
    <div className={"SidebarDiv"+" "+"SidebarDiv"+props.position}>
      <div className="list-group">
        {categories&& categories.map((element, index) => {
          return (
            <Link
              key={index}
              to={"/menu/"+element.name}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              {nameTitle(element.name)}
              <span className="badge bg-primary rounded-pill">({element.amount})</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
