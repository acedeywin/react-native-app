import React, { Component } from "react";
import { Platform, View } from "react-native";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator } from "react-navigation";

const MenuNavigator = createStackNavigator(
  {
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail },
  },
  {
    initialRouteName: "Menu",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#513da8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

export default class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          // paddingTop:
          //   Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MenuNavigator />
      </View>
    );
  }
}
