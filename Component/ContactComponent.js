import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

export default class Contact extends Component {
  sendMail() {
    MailComposer.composeAsync({
      recipients: ["stephenokpala@gmail.com"],
      subject: "Enquiry",
      body: "For testing the App",
    });
  }

  render() {
    return (
      <View>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card title={"Contact Information"}>
            <Text style={{ margin: 20 }}>121, Clear Water Bay Road</Text>
            <Text style={{ margin: 20 }}>Clear Water Bay, Kowloon</Text>
            <Text style={{ margin: 20 }}>HONG KONG</Text>
            <Text style={{ margin: 20 }}>Tel: +852 1234 5678</Text>
            <Text style={{ margin: 20 }}>Fax: +852 8765 4321</Text>
            <Text style={{ margin: 20 }}>Email:confusion@food.net</Text>

            <Button
              title={"Send EMail"}
              color="#512DA8"
              onPress={this.sendMail}
            >
              <Icon
                name="envelope-o"
                size={18}
                type="font-awesome"
                color="white"
              />
            </Button>
          </Card>
        </Animatable.View>
      </View>
    );
  }
}
