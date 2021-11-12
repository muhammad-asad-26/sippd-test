import React, { Component } from "react";
import Product from "./product";

class Products extends Component {
  render() {
    const {
      onDelete,
      products,
      onRestart,
      addNewProduct,
      handleSave,
      handleChange,
    } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-3 offset-9">
            <button className="btn btn-secondary mr-2" onClick={addNewProduct}>
              <i className="fa fa-plus" aria-hidden="true" />
            </button>
            <button
              className="btn btn-primary mr-2"
              onClick={onRestart}
              disabled={products.length !== 0 ? "disabled" : ""}
            >
              <i className="fa fa-recycle" aria-hidden="true" />
            </button>
          </div>
        </div>
        <br />
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onDelete={onDelete}
            handleSave={handleSave}
            handleChange={handleChange}
          />
        ))}
      </div>
    );
  }
}

export default Products;
