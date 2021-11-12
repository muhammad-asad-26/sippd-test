import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Product = ({ product, handleSave, onDelete }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This is a required field."),
    price: Yup.string()
      .required("This is a required field.")
      .matches(/^[0-9]*/, "Price is invalid"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const getBadgeClasses = (product) => {
    let classes = "badge badge-";
    classes += product.price === 0 ? "warning" : "primary";
    return classes;
  };

  const { register, handleSubmit, formState, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    clearErrors(["name", "price"]);
    handleSave(product.id, data);
    return false;
  };

  return (
    <div className="mt-2 mb-2">
      {product.isSaved ? (
        <div className="row">
          <div className="col-6 offset-3">
            <div className="row">
              <div className="col-6">
                <span className="mr-4" style={{ fontSize: 24 }}>
                  {product.name}
                </span>
              </div>
              <div className="col-6">
                <span
                  style={{ fontSize: 24 }}
                  className={getBadgeClasses(product)}
                >
                  {product.price}
                </span>
              </div>
            </div>
          </div>
          <div className="col-3">
            <button
              className="btn btn-danger"
              onClick={() => onDelete(product.id)}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6 offset-3">
              <div className="row">
                <div className="col-6">
                  <input
                    className="form-control"
                    placeholder="*product Name"
                    {...register("name")}
                  />
                  <span className="text-danger">
                    {errors.name ? errors.name.message : ""}
                  </span>
                </div>
                <div className="col-6">
                  <input
                    className="form-control"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    placeholder="*product price"
                    {...register("price")}
                  />
                  <span className="text-danger">
                    {errors.price ? errors.price.message : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-3">
              <button type="submit" className="btn btn-success mr-2">
                <i className="fa fa-save" aria-hidden="true" />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(product.id)}
              >
                <i className="fa fa-trash-o" aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Product;
