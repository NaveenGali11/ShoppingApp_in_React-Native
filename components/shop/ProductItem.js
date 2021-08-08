import React from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../UI/Card";

const ProductItem = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.imageLink }} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>{props.children}</View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "17%",
    padding: 10,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
});

export default ProductItem;
