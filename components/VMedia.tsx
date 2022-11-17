import React from "react";
import styled from "styled-components/native";
import { IMovie } from "../screens/Movies";
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

const VMedia: React.FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <Movie>
      <Poster path={movie.poster_path} />
      <Title>
        {movie.original_title.slice(0, 13)}
        {movie.original_title.length > 13 ? "..." : null}
      </Title>
      <Votes votes={movie.vote_average} />
    </Movie>
  );
};

export default VMedia;
