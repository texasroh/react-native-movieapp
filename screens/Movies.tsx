import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  return (
    <TouchableOpacity onPress={() => navigate("Stack", { screen: "One" })}>
      <Text>Movies</Text>
    </TouchableOpacity>
  );
};

export default Movies;
