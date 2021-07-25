import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const categories = [
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
  return (
    <div className="SidebarDiv">
      <div className="list-group">
        {categories.map((element, index) => {
          return (
            <Link
              key={index}
              to="#"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              {element.name}
              <span className="badge bg-primary rounded-pill">{element.amount}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
