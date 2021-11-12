import React, { Component } from "react";
import Products from "./components/products";
import NavBar from "./components/navbar";
import Total from "./components/Total";

class App extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    let products = JSON.parse(localStorage.getItem("data"));
    if (products !== null) {
      this.setState({
        products: [...products],
      });
    }
  }

  componentWillUnmount() {
    localStorage.setItem("data", JSON.stringify(this.state.products));
  }

  handleDelete = (productId) => {
    const products = this.state.products.filter((c) => c.id !== productId);
    this.setState({ products });
    localStorage.setItem("data", JSON.stringify(products));
  };

  handleSave = (productId, data) => {
    const products = [...this.state.products];
    const index = products.findIndex((x) => x.id === productId);
    products[index].name = data.name;
    products[index].price = data.price;
    products[index].isSaved = true;
    this.setState({ products: [...products] });
    localStorage.setItem("data", JSON.stringify(products));
  };

  handleRestart = () => {
    window.location.reload();
  };

  addNewProduct = () => {
    const products = [...this.state.products];
    this.setState({
      products: [
        ...products,
        {
          id:
            (products[products.length - 1]
              ? products[products.length - 1].id
              : 0) + 1,
          name: "",
          price: 0,
          isSaved: false,
        },
      ],
    });
  };

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div className="card__box">
            <NavBar />
            <Products
              products={this.state.products}
              addNewProduct={this.addNewProduct}
              onDelete={this.handleDelete}
              onRestart={this.handleRestart}
              handleSave={this.handleSave}
            />
            <hr />
            <Total
              totalItems={this.state.products.length}
              total={
                this.state.products.length >= 2
                  ? this.state.products.reduce(
                      (a, b) => Number(a.price) + Number(b.price)
                    )
                  : this.state.products.length === 1
                  ? this.state.products[0].price
                  : 0
              }
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
