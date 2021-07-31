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
    rating: [10, 1],
    ovjVec: [
      { name: "carlos", apellido: "carlos" },
      { name: "daniel", apellido: "daniel" },
    ],
  });
  const categories = [
    {
      name: "Whisky",
      amount: "10",
      path: "whisky",
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
      <div className="alert alert-warning">
        <strong>nota importante:</strong> esta ruta no se encuntra protegida
        para facilitar la evalución de la funcionalidad de los metodos del CRUD
        en la lista de bebidas. en la entraga final será exclusiva de los
        administradores.
      </div>
      <div className="container">
        <form onSubmit={pushData} id="Myform">
          <div className="row">
            <div className="col-md-6">
              <label>name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={drink.name}
                placeholder="name"
                onChange={handleChange}
                id="name"
              />
            </div>
            <div className="col-md-6">
              <label>abv</label>
              <input
                className="form-control"
                type="number"
                name="abv"
                value={drink.abv}
                placeholder="abv"
                onChange={handleChange}
                id="abv"
              />
            </div>
            <div className="col-md-6">
              <label>amount</label>
              <input
                className="form-control"
                type="number"
                name="amount"
                value={drink.amount}
                placeholder="amount"
                onChange={handleChange}
                id="amount"
              />
            </div>
            <div className="col-md-6">
              <label>brand</label>
              <input
                className="form-control"
                type="text"
                name="brand"
                value={drink.brand}
                placeholder="brand"
                onChange={handleChange}
                id="brand"
              />
            </div>
            <div className="col-md-6">
              <label>category</label>
              <div className="my-auto">
                <select
                  type="text"
                  name="category"
                  value={drink.category}
                  onChange={handleChange}
                  id="category"
                >
                  {categories.map((element, index) => {
                    return (
                      <option value={element.path} key={index}>
                        {element.path}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label>urlimg</label>
              <input
                className="form-control"
                type="text"
                name="urlimg"
                value={drink.urlimg}
                placeholder="abv"
                onChange={handleChange}
                id="urlimg"
              />
            </div>
            <div className="col-md-6">
              <label>price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={drink.price}
                placeholder="price"
                onChange={handleChange}
                id="price"
              />
            </div>
            <div className="col-md-6">
              <label>discount %</label>
              <input
                className="form-control"
                type="number"
                name="discount"
                value={drink.discount}
                placeholder="discount"
                onChange={handleChange}
                id="discount"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 p-2 mt-3">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnew;
