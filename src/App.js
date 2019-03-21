import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      goods: [],
      filteredList: []
    };
    this.filterGoods = this.filterGoods.bind(this);
  }
  componentDidMount() {
    fetch("https://demo3907346.mockable.io/products")
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          goods: result.products
        });
      });
  }
  filterGoods(event) {
    let oldGoods = this.state.goods;
    let updatedList = oldGoods.filter(
      item =>
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    );
    this.setState({ filteredList: updatedList });
  }
  render() {
    const { goods, isLoaded, filteredList } = this.state;
    let list = filteredList.length >= 1 ? filteredList : goods;
    if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <input type="text" onChange={this.filterGoods} />
          <ul>
            {list.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
