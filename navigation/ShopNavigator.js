import React from "react";
import { Button, Platform, SafeAreaView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverviewScreen, {
  screenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import OrdersScreen, {
  ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
// import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen, {
  UserProductsScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, { AuthScreenOptions } from "../screens/user/AuthScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";
import ProductDetailsScreen, {
  detailsScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, { cartScreenOptions } from "../screens/shop/CartScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

// export const ProductsNavigator = () => {
//   return (
//     <ProductsStackNavigator.Navigator ScreenOptions={defaultNavOptions}>
//       <ProductsStackNavigator.Screen
//         name="ProductsOverview"
//         component={ProductsOverviewScreen}
//         options={screenOptions}
//       />
//       <ProductsStackNavigator.Screen
//         name="ProductDetails"
//         component={ProductDetailsScreen}
//         options={detailsScreenOptions}
//       />
//       <ProductsStackNavigator.Screen
//         name="Cart"
//         component={CartScreen}
//         options={cartScreenOptions}
//       />
//     </ProductsStackNavigator.Navigator>
//   );
// };

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={screenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={detailsScreenOptions}
      />

      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// const productsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetails: ProductDetailsScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//           size={23}
//           // style={{ marginTop: 50 }}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const ordersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <ordersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ordersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </ordersStackNavigator.Navigator>
  );
};

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
// {
//   navigationOptions: {
//     drawerIcon: (drawerConfig) => (
//       <Ionicons
//         name={Platform.OS === "android" ? "md-list" : "ios-list"}
//         size={23}
//         color={drawerConfig.tintColor}
//       />
//     ),
//   },
//   defaultNavigationOptions: defaultNavOptions,
// }
// );

const adminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <adminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <adminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={UserProductsScreenOptions}
      />
      <adminStackNavigator.Screen
        name="EditProducts"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </adminStackNavigator.Navigator>
  );
};

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProducts: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 40 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                <Button
                  title="Logout"
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(authActions.logout());
                    // props.navigation.navigate("Auth");
                  }}
                />
              </View>
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{
        activeTintColor: Colors.primary,

        labelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
    >
      <ShopDrawerNavigator.Screen
        name="All Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              // style={{ marginTop: 50 }}
              color={props.color}
            />
          ),
          headerShown: false,
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
          headerShown: false,
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
          headerShown: false,
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: productsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary,

//       labelStyle: {
//         fontFamily: "open-sans-bold",
//       },
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();

//       return (
//         <View style={{ flex: 1, paddingTop: 40 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerItems {...props} />
//             <View style={{ marginTop: 15, marginHorizontal: 20 }}>
//               <Button
//                 title="Logout"
//                 color={Colors.primary}
//                 onPress={() => {
//                   dispatch(authActions.logout());
//                   // props.navigation.navigate("Auth");
//                 }}
//               />
//             </View>
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const MainNavigator = createSwitchNavigator({
//   StartUp: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
