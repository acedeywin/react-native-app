import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Switch,
  Button,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";

class Reservation extends Component {
  constructor() {
    super();

    this.state = {
      guests: 1,
      smoking: false,
      date: "",
    };
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
    });
  }

  render() {
    return (
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
          <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
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
            style={{ flex: 1, marginRight: 10 }}
            date={this.state.date}
            format="YYYY-MM-DD"
            mode="date"
            placeholder="Select date and time"
            minDate="2020-10-01"
            maxDate="2020-11-01"
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
            }}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Button
            title="Reserve"
            color="#512da8"
            onPress={() => this.handleReservation()}
            accessibilityLabel="Learn more if you are interested"
          ></Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
});

export default Reservation;
