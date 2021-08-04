import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

const ProductItem = (props) => {
  return (
    <View style={styles.product}>
      <Image style={styles.image} source={{ uri: props.imageLink }} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <Button title="View Details" onPress={props.onViewDetail} />
        <Button title="To Cart" onPress={props.onAddToCart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    borderTopColor: "red",
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
});

export default ProductItem;
