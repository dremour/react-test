import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      goods: []
    };
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
  render() {
    const { goods, isLoaded } = this.state;
    if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <ul>
          {goods.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      );
    }
  }
}

export default App;
