import React from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  Alert,
  PanResponder,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import { styles } from "./ReservationComponent";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

function RenderDish(props) {
  const dish = props.dish;

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) {
      return true;
    } else {
      return false;
    }
  };

  // const PanResponder = React.useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: (e, gestureState) => {
  //       return true;
  //     },
  //     onPanResponerEnd: (e, gestureState) => {
  //       if (recognizeDrag(gestureState)) {
  //         Alert.alert(
  //           "Add to favorites",
  //           "Are you sure you wish to add " +
  //             dish.name +
  //             " to your favorites?"[
  //               ({
  //                 text: "Cancel",
  //                 onPress: () => console.log("Cancel Pressed"),
  //                 style: "cancel",
  //               },
  //               {
  //                 text: "OK",
  //                 onPress: () =>
  //                   props.favorite
  //                     ? console.log("Aleady favorite")
  //                     : props.onPress(),
  //               })
  //             ],
  //           { cancelable: false }
  //         );
  //         return true;
  //       }
  //     },
  //   })
  // ).current;

  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        {...PanResponder.panHandlers}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Icon
              raised
              reverse
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              onPress={() =>
                props.favorite
                  ? console.log("Aleady favorite")
                  : props.onPress()
              }
            />
            <Icon
              raised
              reverse
              name={"pencil"}
              type="font-awesome"
              color="#512DA8"
              onPress={() => props.openModal()}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

const RenderComments = (props) => {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.toString()}
        />
      </Card>
    </Animatable.View>
  );
};

class Dishdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      showModal: false,
      rating: "",
      author: "",
      comment: "",
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleComment(dishId) {
    console.log(JSON.stringify(this.state) + dishId);

    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );

    this.toggleModal();
  }

  render() {
    const dishId = this.props.route.params.dishId;
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          openModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
        >
          <View style={styles.modal}>
            <View>
              <Rating
                type="star"
                fractions={0}
                startingValue={0}
                imageSize={38}
                onFinishRating={(rating) => this.setState({ rating: rating })}
                showRating
              />
            </View>
            <View style={styles.modalText}>
              <Input
                placeholder="Author"
                leftIcon={<Icon name="user-o" type="font-awesome" size={24} />}
                onChangeText={(author) => this.setState({ author })}
              />
            </View>
            <View style={styles.modalText}>
              <Input
                placeholder="Comment"
                leftIcon={
                  <Icon name="comment-o" type="font-awesome" size={24} />
                }
                onChangeText={(comment) => this.setState({ comment })}
              />
            </View>
            <View style={styles.modalText}>
              <Button
                onPress={() => {
                  this.handleComment(dishId);
                }}
                color="#512DA8"
                title="Submit"
              />
            </View>
            <View style={styles.modalText}>
              <Button
                onPress={() => {
                  this.toggleModal();
                }}
                color="#984500"
                title="Close"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
