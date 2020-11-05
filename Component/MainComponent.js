import React, { Component } from "react";
import { View, Image, StyleSheet, ScrollView, Text } from "react-native";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Reservation from "./ReservationComponent";
import Login from "./LoginComponent";
import Favorites from "./FavoriteComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItems } from "@react-navigation/drawer";
import { SafeAreaView } from "react-navigation";
import { Icon } from "react-native-elements";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import { connect } from "react-redux";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const Stack = createStackNavigator();

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#513da8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              iconStyle={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen name="Dishdetail" component={Dishdetail} />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#513da8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              iconStyle={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#513da8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              iconStyle={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#513da8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="About"
        component={About}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              iconStyle={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const ReservationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#513da8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="Reservation"
        component={Reservation}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              iconStyle={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const FavoritesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#513da8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              iconStyle={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#513da8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              iconStyle={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContentComponent = ({ props }) => {
  return (
    <ScrollView>
      <SafeAreaView
        style={StyleSheet.container}
        forceInset={{ top: "always", horizontal: "never" }}
      />
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  );
};

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: "#d1c4e9" }}
      // drawerContent={() => <CustomDrawerContentComponent />}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Login"
        component={LoginNavigator}
        drawerLabel="Login"
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        drawerLabel="Home"
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutNavigator}
        drawerLabel="About Us"
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Menu"
        component={MenuNavigator}
        drawerLabel="Menu"
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="list" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactNavigator}
        drawerLabel="Contact Us"
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={22}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Favorites"
        component={FavoritesNavigator}
        drawerLabel="My Favorites"
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="heart"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Reserve Table"
        component={ReservationNavigator}
        drawerLabel="Reserve Table"
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="cutlery"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const MainNav = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

// const MainNavigator = createDrawerNavigator(
//   {
//     Contact: {
//       screen: ContactNavigator,
//       navigationOptions: {
//         title: "Contact",
//         drawerLabel: "Contact Us",
//         drawerIcon: ({ tintColor }) => (
//           <Icon
//             name="address-card"
//             type="font-awesome"
//             size={22}
//             color={tintColor}
//           />
//         ),
//       },
//     },
//   },
//   {
//drawerBackgroundColor: "#d1c4e9",
//     contentComponent: ,
//   }
// );

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return <MainNav />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512da8",
    height: 148,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});
