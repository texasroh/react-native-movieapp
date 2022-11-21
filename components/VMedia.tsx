import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { IMovie, ITv } from "../api";
import { RootStackParamList } from "../screens/Detail";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
    align-items: center;
`;

const Title = styled.Text`
    color: white;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;

interface IVMediaProps {
    media: IMovie | ITv;
}

type RootStackParamList = {
    Stack: {
        screen: string;
        params: IMovie | ITv;
    };
};

const VMedia: React.FC<IVMediaProps> = ({ media }) => {
    const originalTitle = media.original_title ?? media.original_name;
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const goToDetail = () => {
        navigation.navigate("Stack", {
            screen: "Detail",
            params: media,
        });
    };
    return (
        <TouchableOpacity onPress={goToDetail}>
            <Movie>
                <Poster path={media.poster_path} />
                <Title>
                    {originalTitle.slice(0, 13)}
                    {originalTitle.length > 13 ? "..." : null}
                </Title>
                <Votes votes={media.vote_average} />
            </Movie>
        </TouchableOpacity>
    );
};

export default VMedia;
