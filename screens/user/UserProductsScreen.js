import React from "react";
import { Alert, Button, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";

import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";

import * as productActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProducts", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are You Sure", "Do you really want to delete this item ?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          imageLink={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.accent}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Users Personal Items",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.openDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProducts");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
