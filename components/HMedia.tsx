import React from "react";
import styled from "styled-components/native";
import { IMovie } from "../screens/Movies";
import Poster from "./Poster";
import Votes from "./Votes";

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

const HMedia: React.FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <Movie key={movie.id}>
      <Poster path={movie.poster_path} />
      <HColumn>
        <Title>{movie.original_title}</Title>

        {movie.release_date ? (
          <Release>
            {new Date(movie.release_date).toLocaleDateString("ko", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Release>
        ) : null}

        <Overview>
          {movie.overview !== "" && movie.overview.length > 80
            ? `${movie.overview.slice(0, 80)}...`
            : movie.overview}
        </Overview>
      </HColumn>
    </Movie>
  );
};

export default HMedia;
