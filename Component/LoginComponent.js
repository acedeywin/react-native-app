import React, { Component } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Input, Icon, CheckBox, Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { baseUrl } from "../shared/baseUrl";
import { styles } from "./ReservationComponent";

class LoginTab extends Component {
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
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate("Register")}
            title="Register"
            clear
            color="blue"
            titleStyle={{ color: "blue" }}
          />
        </View>
      </View>
    );
  }
}

class RegisterTab extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      remember: false,
      imageUrl: `${baseUrl} /images/logo.png`,
    };
  }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!capturedImage.cancelled) {
        this.setState({ imageUrl: capturedImage.uri });
      }
    }
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={{ uri: this.state.imageUrl }}
              style={styles.image}
            />
            <Button title="Camera" onPress={this.getImageFromCamera} />
          </View>
          <Input
            placeholder="Username"
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
          <Input
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            inputContainerStyle={styles.formInput}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            inputContainerStyle={styles.formInput}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope-o" }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
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
              onPress={() => this.handleRegister()}
              title="Register"
              color="#512da8"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const Tab = createBottomTabNavigator();

const Login = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
      tabBarOptions={{
        activeBackgroundColor: "#9575cd",
        inactiveBackgroundColor: "#d1c4e9",
        activeTintColor: "white",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginTab}
        options={
          <Icon name="sign-in" type="font-awesome" size={24} color="white" />
        }
      />

      <Tab.Screen
        name="Register"
        component={RegisterTab}
        options={
          <Icon name="user-plus" type="font-awesome" size={24} color="white" />
        }
      />
    </Tab.Navigator>
  );
};

export default Login;

// const MainBottomNav = () => {
//   return (
//     <NavigationContainer>
//       <LoginBottomTabNavigator />
//     </NavigationContainer>
//   );
// };

// export default MainBottomNav;
