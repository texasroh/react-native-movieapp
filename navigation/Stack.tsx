import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { BLACK_COLOR } from "../colors";
import Detail from "../screens/Detail";

const nativeStack = createNativeStackNavigator();

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
