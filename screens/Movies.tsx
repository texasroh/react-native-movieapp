import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView``;

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
