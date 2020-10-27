import React, { Component } from "react";
import { Text, FlatList, View } from "react-native";
import { Card } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { LEADERS } from "../shared/leaders";

const History = () => {
  return (
    <View>
      <Card title={"Our History"}>
        <Text style={{ margin: 10 }}>
          Started in 2010, Ristorante con Fusion quickly established itself as a
          culinary icon par excellence in Hong Kong. With its unique brand of
          world fusion cuisine that can be found nowhere else, it enjoys
          patronage from the A-list clientele in Hong Kong. Featuring four of
          the best three-star Michelin chefs in the world, you never know what
          will arrive on your plate the next time you visit us.
        </Text>

        <Text style={{ margin: 10 }}>
          The restaurant traces its humble beginnings to The Frying Pan, a
          successful chain started by our CEO, Mr. Peter Pan, that featured for
          the first time the world's best cuisines in a pan.
        </Text>
      </Card>
    </View>
  );
};

export default class About extends Component {
  constructor() {
    super();
    this.state = {
      leaders: LEADERS,
    };
  }

  static navigationOptions = {
    title: "About Us",
  };

  render() {
    const renderAboutItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          leftAvatar={{ source: require("./images/alberto.png") }}
        />
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <History />

        <View>
          <Card title="Corporate Leadership">
            <FlatList
              data={this.state.leaders}
              renderItem={renderAboutItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </Card>
        </View>
      </View>
    );
  }
}
