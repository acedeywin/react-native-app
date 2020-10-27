import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

const RenderItem = (props) => {
  const item = props.item;

  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={require("./images/uthappizza.png")}
      >
        <Text style={{ margin: 20 }}>{item.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
};

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }

  static navigationOptions = {
    title: "Home",
  };

  render() {
    return (
      <View>
        <Text>
          <ScrollView>
            <RenderItem
              item={this.state.dishes.filter((dish) => dish.featured)[0]}
            />
            <RenderItem
              item={this.state.promotions.filter((promo) => promo.featured)[0]}
            />
            <RenderItem
              item={this.state.leaders.filter((leader) => leader.featured)[0]}
            />
          </ScrollView>
        </Text>
      </View>
    );
  }
}
