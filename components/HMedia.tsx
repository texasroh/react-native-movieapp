import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { IMovie, ITv } from "../api";
import Poster from "./Poster";

const Movie = styled.View`
    padding: 0px 30px;
    flex-direction: row;
`;

const Title = styled.Text`
    color: white;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;
const HColumn = styled.View`
    margin-left: 15px;
    width: 65%;
`;

const Overview = styled.Text`
    color: white;
    opacity: 0.8;
`;

const Release = styled.Text`
    color: white;
    font-size: 12px;
    margin-vertical: 5px;
`;

interface IHMediaProps {
    media: IMovie | ITv;
}

const HMedia: React.FC<IHMediaProps> = ({ media }) => {
    const originalTitle = media.original_title ?? media.original_name;
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", { screen: "Detail", params: media });
    };
    return (
        <TouchableOpacity onPress={goToDetail}>
            <Movie>
                <Poster path={media.poster_path} />
                <HColumn>
                    <Title>
                        {originalTitle.length > 30
                            ? `${originalTitle.slice(0, 30)}...`
                            : originalTitle}
                    </Title>

                    {media.releaseDate ? (
                        <Release>
                            {new Date(media.releaseDate).toLocaleDateString(
                                "ko",
                                {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}
                        </Release>
                    ) : null}

                    <Overview>
                        {media.overview !== "" && media.overview.length > 80
                            ? `${media.overview.slice(0, 80)}...`
                            : media.overview}
                    </Overview>
                </HColumn>
            </Movie>
        </TouchableOpacity>
    );
};

export default HMedia;
