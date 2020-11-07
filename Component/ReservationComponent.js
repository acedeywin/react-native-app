import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Switch,
  Button,
  Modal,
  Alert,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import * as Animatable from "react-native-animatable";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { color } from "react-native-reanimated";

class Reservation extends Component {
  constructor() {
    super();

    this.state = {
      guests: 1,
      smoking: false,
      date: "",
      showModal: false,
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    Alert.alert(
      "Your Reservation OK?",
      `Number of Guests: ${this.state.guests}  
            Smoking?:   ${this.state.smoking ? "Yes" : "No"}
            Date and Time: ${this.state.date}`,
      [
        {
          text: "Cancel",
          onPress: () => this.resetForm(),
          style: " cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.presentLocalNotification(this.state.date);
            this.resetForm();
          },
        },
      ],
      { cancelable: false }
    );
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
    });
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notification");
      }
    }
    return permission;
  }

  async presentLocalNotification() {
    await this.obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
      title: "Your Reservation",
      body: "Reservation for " + dat + " requested",
      ios: {
        sound: true,
      },
      android: {
        name: "Confusion",
        sound: true,
        vibrate: true,
        color: "#512da8",
      },
    });
  }

  render() {
    return (
      <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
        <ScrollView>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ guests: itemValue })
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              trackColor={{ true: "#512da8", false: "#fff" }}
              onValueChange={(value) => this.setState({ smoking: value })}
            ></Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <DatePicker
              style={{ flex: 1, marginRight: 20 }}
              date={this.state.date}
              format=""
              mode="datetime"
              placeholder="select date and Time"
              minDate="2017-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({ date: date });
              }}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={() => this.handleReservation()}
              title="Reserve"
              color="#512DA8"
              title="Reserve"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </ScrollView>
      </Animatable.View>
    );
  }
}

export const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512da8",
    textAlign: "center",
    color: "white",
    paddingLeft: 5,
    paddingRight: 5,
  },
  modalText: {
    fontSize: 10,
    margin: 10,
  },
  description: {
    margin: 10,
  },
  Spacer: {
    margin: 10,
  },
  iconstyle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalbutton: {
    width: 50,
  },
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formInput: {
    margin: 20,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  image: {
    margin: 40,
  },
});

export default Reservation;
