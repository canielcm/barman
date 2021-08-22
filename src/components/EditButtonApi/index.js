import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
export const EditButtonApi = (props) => {
  const { updateDrinkApi, deleteDrinkApi, categoryListApi } = useDrinkMethods();
  const [drink, setDrink] = useState(props.drink);
  const [categories, setCategories] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({
    show: false,
    type: true,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrink({ ...drink, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("nuevo descuento: ", drink.descuento);
      await updateDrinkApi(drink, drink.id_bebida);
      setUpdatedStatus({ show: true, type: true });
      setTimeout(() => {
        setUpdatedStatus({ show: false, type: true });
      }, 3000);
    } catch (error) {
      setUpdatedStatus({ show: true, type: false });
      setTimeout(() => {
        setUpdatedStatus({ show: false, type: true });
      }, 3000);
    }
    // updateCrudControl();
  };
  const DeleteDrink = async () => {
    await deleteDrinkApi(drink.id_bebida);
    // updateCrudControl();
  };
  useEffect(async () => {
    const vecCategory = await categoryListApi;
    setCategories(vecCategory);
  }, [categoryListApi]);
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#modal${props.drink.id_bebida}`}
      >
        info
      </button>
      <div
        className="modal fade"
        id={`modal${props.drink.id_bebida}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.drink.nombre_bebida}
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
                        type="text"
                        name="cod_categoria"
                        value={drink.cod_categoria}
                        onChange={handleChange}
                        id="category"
                      >
                        {categories.map((element, index) => {
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
                      placeholder="volume"
                      onChange={handleChange}
                      id="volume"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 p-2 mt-3"
                >
                  Update
                </button>
                {updatedStatus.show == true && (
                  <div className="mt-3">
                    {updatedStatus.type ? (
                      <div className="alert alert-success text-center">
                        Info Updated!
                      </div>
                    ) : (
                      <div className="alert alert-danger text-center">
                        Something is going wrong!
                      </div>
                    )}
                  </div>
                )}
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
