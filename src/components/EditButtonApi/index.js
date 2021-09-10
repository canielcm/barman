import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
export const EditButtonApi = (props) => {
  const { updateDrinkApi, deleteDrinkApi, categoryList } = useDrinkMethods();
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
      console.log("new discount: ", drink.discount);
      await updateDrinkApi(drink, drink.id);
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
    await deleteDrinkApi(drink.id);
    // updateCrudControl();
  };
  useEffect(async () => {
    const vecCategory = await categoryList;
    setCategories(vecCategory);
    console.log("drink data: ", drink)
  }, [categoryList]);
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
        tabIndex="-1"
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
                        name="category_id"
                        value={drink.category_id}
                        onChange={handleChange}
                        id="category"
                      >
                        {categories.map((element, index) => {
                          return (
                            <option value={element.category_id} key={index}>
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
                      type="number"
                      name="description"
                      value={drink.description}
                      placeholder="description"
                      onChange={handleChange}
                      id="description"
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
