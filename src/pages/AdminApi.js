import React, { useEffect, useState } from "react";
import { useDrinkMethods } from "../context/DrinkMethodsContext";
import { Table, EditButtonApi } from "../components";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const AdminApi = () => {
  const [data, setData] = useState([]);
  const [infoMatrix, setInfoMatrix] = useState([]);
  const history = useHistory();
  const { currentUser, isAdmin } = useAuth();
  const [drink, setDrink] = useState({
    amount: 0,
    category_id: 0,
    description: "",
    discount: 0,
    abv: 0,
    brand: "",
    name: "",
    puntuacion: 0,
    urlimg: "",
    puntuacion: 10,
    price: 0,
  });
  const {
    drinkList,
    getDrinkByIdApi,
    addDrinkApi,
    updateDrinkApi,
    deleteDrinkApi,
    categoryList,
    getCategoryByIdApi,
  } = useDrinkMethods();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDrink({ ...drink, [name]: value });
  };
  const pushData = (e) => {
    e.preventDefault();

    addDrinkApi(drink);
    document.getElementById("name").value = "";
    document.getElementById("abv").value = 0;
    document.getElementById("amount").value = 0;
    document.getElementById("brand").value = "";
    document.getElementById("discount").value = 0;
    document.getElementById("price").value = 0;
    document.getElementById("volume").value = 0;
    document.getElementById("urlimgimg").value = "";
    setDrink({
      amount: 0,
      category_id: 0,
      description: "",
      discount: 0,
      abv: 0,
      brand: "",
      name: "",
      urlimg: "",
      price: 0,
    });
  };
  const TurnToMatrix = (vec) => {
    let Matrix = [];
    let nameCategory;
    vec.map((e, index) => {
      nameCategory = data.nombre_categoria;
      console.log(nameCategory);
      if (index == 0) {
        Matrix.push([
          "info",
          "Name",
          "img",
          "Amount",
          "Category",
          "Brand",
          "price",
        ]);
        Matrix.push([
          <EditButtonApi drink={e} />,
          e.name,
          <img src={e.urlimg} alt={e.name} style={{ width: "40px" }} />,
          e.amount,
          e.nombre_categoria,
          e.brand,
          e.price,
        ]);
      } else {
        Matrix.push([
          <EditButtonApi drink={e} />,
          e.name,
          <img src={e.urlimg} alt={e.name} style={{ width: "40px" }} />,
          e.amount,
          e.nombre_categoria,
          e.brand,
          e.price,
        ]);
      }
    });
    setInfoMatrix(Matrix);
  };
 
  useEffect(async () => {
    let adminChecker = isAdmin();
    console.log('adminChecker: ', adminChecker)
    if (!currentUser || adminChecker==false) {
      history.push("/");
    }
   
    const cod = await categoryList[0];
    if (cod) {
      await setDrink({ ...drink, category_id: cod.id });
    }
    TurnToMatrix(drinkList);
  }, [categoryList, drinkList]);
  return (
    <div>
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus vel corporis qui perspiciatis doloribus, illo perferendis laboriosam velit quo tenetur voluptas nemo ad nesciunt voluptates provident eius quasi neque placeat. */}
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
                  type="number"
                  name="category_id"
                  value={drink.category_id}
                  onChange={handleChange}
                  id="category"
                >
                  {categoryList.map((element, index) => {
                    return (
                      <option value={element.id} key={index}>
                        {element.name}
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
                placeholder="urlimg"
                onChange={handleChange}
                id="urlimgimg"
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
            <div className="col-md-12">
              <label>description</label>
              <textarea
                className="form-control"
                type="text"
                name="description"
                value={drink.description}
                placeholder="description"
                onChange={handleChange}
                id="description"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 p-2 mt-3">
            submit
          </button>
        </form>
        <div className="container"></div>
        {infoMatrix && <Table matrizCotent={infoMatrix}></Table>}
      </div>
    </div>
  );
};
export default AdminApi;
