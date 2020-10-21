import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    return <Menu dishes={this.state.dishes} />;
  }
}

export default Main;
