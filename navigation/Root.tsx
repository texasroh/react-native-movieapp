import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stack from "./Stack";
import Tabs from "./Tabs";

const nav = createNativeStackNavigator();

const Root = () => (
  <nav.Navigator>
    <nav.Screen name="Tabs" component={Tabs} />
    <nav.Screen name="Stack" component={Stack} />
  </nav.Navigator>
);

export default Root;
