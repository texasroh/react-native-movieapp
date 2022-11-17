import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { IMovie } from "../screens/Movies";
import { makeImgPath } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

const BgImg = styled.Image`
  flex: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
`;

const Slide: React.FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        blurRadius={10}
        source={{ uri: makeImgPath(movie.backdrop_path) }}
      />
      <Wrapper>
        <Poster path={movie.poster_path} />
        <Column>
          <Title>{movie.original_title}</Title>
          <Votes votes={movie.vote_average} />
          <Overview>{movie.overview.slice(0, 70)}...</Overview>
        </Column>
      </Wrapper>
    </View>
  );
};

export default Slide;
