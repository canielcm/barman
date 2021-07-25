import React, { useState } from "react";
import { db } from "../firebase-config";
const Addnew = () => {
  const [drink, setDrink] = useState({
    name: "",
    abv: 0,
    amount: 0,
    brand: "",
    category: "",
    discount: 0,
    price: 0,
    urlimg: "",
    rating: [10,1]
  });
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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDrink({ ...drink, [name]: value });
  };
  const pushData = async (e) => {
    e.preventDefault();
    try {
      await db.collection("drinks").add(drink);
      document.getElementById("name").value = "";
      document.getElementById("abv").value = 0;
      document.getElementById("amount").value = 0;
      document.getElementById("brand").value = "";
      document.getElementById("discount").value = 0;
      document.getElementById("price").value = 0;
      document.getElementById("urlimg").value = "";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="addnewDiv">
      <form onSubmit={pushData} id="Myform">
        <div>
          <label>name</label>
          <input
            type="text"
            name="name"
            value={drink.name}
            placeholder="name"
            onChange={handleChange}
            id="name"
          />
        </div>
        <div>
          <label>abv</label>
          <input
            type="number"
            name="abv"
            value={drink.abv}
            placeholder="abv"
            onChange={handleChange}
            id="abv"
          />
        </div>
        <div>
          <label>amount</label>
          <input
            type="number"
            name="amount"
            value={drink.amount}
            placeholder="amount"
            onChange={handleChange}
            id="amount"
          />
        </div>
        <div>
          <label>brand</label>
          <input
            type="text"
            name="brand"
            value={drink.brand}
            placeholder="brand"
            onChange={handleChange}
            id="brand"
          />
        </div>
        <div>
          <label>category</label>
          <select
          type="text"
          name="category"
          value={drink.category}
          onChange={handleChange}
          id="category"
          >{
            categories.map((element, index)=>{
                return(
                    <option value={element.path} key={index}>{element.path}</option>
                )
            })
          }
          </select>
        </div>
        <div>
          <label>discount</label>
          <input
            type="number"
            name="discount"
            value={drink.discount}
            placeholder="discount"
            onChange={handleChange}
            id="discount"
          />
        </div>
        <div>
          <label>price</label>
          <input
            type="number"
            name="price"
            value={drink.price}
            placeholder="price"
            onChange={handleChange}
            id="price"
          />
        </div>
        <div>
          <label>urlimg</label>
          <input
            type="text"
            name="urlimg"
            value={drink.urlimg}
            placeholder="abv"
            onChange={handleChange}
            id="urlimg"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
};

export default Addnew;
