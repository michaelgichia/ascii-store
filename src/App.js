import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Panel from "./Panel";
import "./App.css";

const BASE_URL = "http://localhost:3000";

class App extends Component {
  state = {
    idFilter: "",
    selectFilter: "",
    products: [],
    hasMore: true
  };

  componentWillMount() {
    fetch(`${BASE_URL}/api/products?_limit=15`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            if (json.length > 0) {
              this.setState(() => ({ products: json }));
            } else {
              this.setState({ hasMore: false });
            }
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
    } else if (idFilter.length > 0) {
      return products.filter((product) => product.id.includes(idFilter));
    } else {
      return products;
    }
  };

  loadMoreProducts = (page) => {
    fetch(`${BASE_URL}/api/products?_page=${page}&_limit=15`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          const clonedProducts = [...this.state.products];
          response.json().then((json) => {
            if (json.length > 0) {
              clonedProducts.push(...json);
              this.setState(() => ({ products: clonedProducts }));
            } else {
              this.setState({ hasMore: false });
            }
          });
        }
      })
      .catch((err) => {
        this.setState(() => ({ fetchError: err }));
      });
  };

  render() {
    const { idFilter, products, selectFilter, hasMore } = this.state;
    const sortedProducts = this.filterBySizeOrPrize(
      products,
      selectFilter,
      idFilter
    );

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
          <input type="button" value="&#x1F50D;" className="search__btn" />
        </nav>
        <main className="main__wrapper">
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            loadMore={this.loadMoreProducts}
            threshold={1000}
            hasMore={hasMore}
            loader={<h3 className="hasMore">Loading ...</h3>}
          >
            {sortedProducts.map((product, index) => (
              <Panel key={`${product.id}${index}`} product={product} />
            ))}
          </InfiniteScroll>
          {!hasMore && <h3 className="hasMore">~ end of catalogue ~</h3>}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
