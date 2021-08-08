import React, { useState } from "react";
import { db } from "../../firebase-config";
import "./styles.css";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
export const EditButton = (props) => {
  const { crudControl, updateCrudControl } = useDrinkMethods();
  const [drink, setDrink] = useState(props.drink);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrink({ ...drink, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(drink);
    await db.collection("drinks").doc(drink.id).update(drink);
    updateCrudControl();
  };
  const DeleteDrink = async () => {
    await db.collection("drinks").doc(drink.id).delete();
    updateCrudControl();
  };
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
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#modal${props.drink.id}`}
      >
        info
      </button>
      <div
        className="modal fade"
        id={`modal${props.drink.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.drink.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} id="Myform">
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
                <button
                  type="submit"
                  className="btn btn-primary w-100 p-2 mt-3"
                >
                  submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={DeleteDrink}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
