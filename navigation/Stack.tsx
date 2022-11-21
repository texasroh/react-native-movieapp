import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import { BLACK_COLOR } from "../colors";
import Detail from "../screens/Detail";

type RootStackParamList = {
  Detail: undefined;
};
const nativeStack = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <nativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        headerTintColor: isDark ? "white" : BLACK_COLOR,
      }}
    >
      <nativeStack.Screen name="Detail" component={Detail} />
    </nativeStack.Navigator>
  );
};

export default Stack;
