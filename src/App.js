import React, { Component } from "react";
import Panel from './Panel';
import "./App.css";

class App extends Component {
  state = {
    idFilter: "",
    selectFilter: "",
    products: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/products?_limit=10", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            this.setState(() => ({ products: json }));
          });
        }
      })
      .catch((err) => {
        this.setState(() => ({ fetchError: err }));
      });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  filterBySizeOrPrize = (products, selectFilter, idFilter) => {
    if (selectFilter.length > 0) {
      return products.sort((a, b) => a[selectFilter] - b[selectFilter]);
    } else if(idFilter.length > 0) {
      return products.filter(product => product.id.includes(idFilter))
    } else {
      return products;
    }
  };

  render() {
    const { idFilter, products, selectFilter } = this.state;
    const sortedProducts = this.filterBySizeOrPrize(products, selectFilter, idFilter);

    return (
      <React.Fragment>
        <nav>
          <select
            value={selectFilter}
            onChange={this.handleInputChange}
            className="select__input"
            id="selectFilter"
          >
            <option value="size">Size</option>
            <option value="price">Price</option>
          </select>
          <input
            type="text"
            value={idFilter}
            id="idFilter"
            onChange={this.handleInputChange}
            className="search_input"
            placeholder="Search for faces with id"
          />
          <input
            type="text"
            type="button"
            value="&#x1F50D;"
            className="search__btn"
          />
        </nav>
        <main className="main__wrapper">
          {sortedProducts.map((product) => (
            <Panel key={product.id} product={product} />
          ))}
        </main>
      </React.Fragment>
    );
  }
}

export default App;

