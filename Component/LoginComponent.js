import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Card, Input, Icon, CheckBox } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { styles } from "./ReservationComponent";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      remember: false,
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      let userinfo = JSON.parse(userdata);

      if (userinfo) {
        this.setState({ username: userinfo.username });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
    });
  }

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          inputContainerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          inputContainerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          inputContainerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            color="#512da8"
          />
        </View>
      </View>
    );
  }
}

export default Login;
