import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";

const nativeStack = createNativeStackNavigator();

const Stack = () => (
  <nativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}
  >
    <nativeStack.Screen name="Detail" component={Detail} />
  </nativeStack.Navigator>
);

export default Stack;
