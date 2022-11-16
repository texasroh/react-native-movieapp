import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }: any) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }: any) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }: any) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Go to search</Text>
  </TouchableOpacity>
);

const nativeStack = createNativeStackNavigator();

const Stack = () => (
  <nativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}
  >
    <nativeStack.Screen name="One" component={ScreenOne} />
    <nativeStack.Screen name="Two" component={ScreenTwo} />
    <nativeStack.Screen name="Three" component={ScreenThree} />
  </nativeStack.Navigator>
);

export default Stack;
