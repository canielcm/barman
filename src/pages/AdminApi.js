import React, { useEffect, useState } from "react";
import { useDrinkMethods } from "../context/DrinkMethodsContext";
import { Table, EditButtonApi } from "../components";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
const AdminApi = () => {
  const [data, setData] = useState([]);
  const [infoMatrix, setInfoMatrix] = useState([]);
  const history = useHistory();
  const { currentUser } = useAuth();
  const [drink, setDrink] = useState({
    cantidad: 0,
    cod_categoria: 0,
    descripcion: "",
    descuento: 0,
    grado_acohol: 0,
    marca: "",
    nombre_bebida: "",
    puntuacion: 0,
    url: "",
    volumen: 0,
    puntuacion: 10,
    precio: 0,
  });
  const {
    drinkListApi,
    getDrinkByIdApi,
    addDrinkApi,
    updateDrinkApi,
    deleteDrinkApi,
    categoryListApi,
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
    document.getElementById("urlimg").value = "";
    setDrink({
      cantidad: 0,
      cod_categoria: 0,
      descripcion: "",
      descuento: 0,
      grado_acohol: 0,
      marca: "",
      nombre_bebida: "",
      puntuacion: 0,
      url: "",
      volumen: 0,
      puntuacion: 10,
      precio: 0,
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
          e.nombre_bebida,
          <img src={e.url} alt={e.name} style={{ width: "40px" }} />,
          e.cantidad,
          e.nombre_categoria,
          e.marca,
          e.precio,
        ]);
      } else {
        Matrix.push([
          <EditButtonApi drink={e} />,
          e.nombre_bebida,
          <img src={e.url} alt={e.name} style={{ width: "40px" }} />,
          e.cantidad,
          e.nombre_categoria,
          e.marca,
          e.precio,
        ]);
      }
    });
    setInfoMatrix(Matrix);
  };
  useEffect(async () => {
    if (!currentUser) {
      history.push("/");
    }
    console.log(categoryListApi);
    const cod = await categoryListApi[0];
    if (cod) {
      await setDrink({ ...drink, cod_categoria: cod.cod_categoria });
    }
    TurnToMatrix(drinkListApi);
  }, [categoryListApi, drinkListApi]);
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
                name="nombre_bebida"
                value={drink.nombre_bebida}
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
                name="grado_acohol"
                value={drink.grado_acohol}
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
                name="cantidad"
                value={drink.cantidad}
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
                name="marca"
                value={drink.marca}
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
                  name="cod_categoria"
                  value={drink.cod_categoria}
                  onChange={handleChange}
                  id="category"
                >
                  {categoryListApi.map((element, index) => {
                    return (
                      <option value={element.cod_categoria} key={index}>
                        {element.nombre_categoria}
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
                name="url"
                value={drink.url}
                placeholder="url"
                onChange={handleChange}
                id="urlimg"
              />
            </div>
            <div className="col-md-6">
              <label>price</label>
              <input
                className="form-control"
                type="number"
                name="precio"
                value={drink.precio}
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
                name="descuento"
                value={drink.descuento}
                placeholder="discount"
                onChange={handleChange}
                id="discount"
              />
            </div>
            <div className="col-md-6">
              <label>volume</label>
              <input
                className="form-control"
                type="number"
                name="volumen"
                value={drink.volumen}
                placeholder="discount"
                onChange={handleChange}
                id="volume"
              />
            </div>
            <div className="col-md-12">
              <label>description</label>
              <textarea
                className="form-control"
                type="text"
                name="descripcion"
                value={drink.descripcion}
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
