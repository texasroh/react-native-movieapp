import React from "react";
import styled from "styled-components/native";
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
  posterPath?: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<IHMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <HColumn>
        <Title>
          {originalTitle.length > 30
            ? `${originalTitle.slice(0, 30)}...`
            : originalTitle}
        </Title>

        {releaseDate ? (
          <Release>
            {new Date(releaseDate).toLocaleDateString("ko", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Release>
        ) : null}

        <Overview>
          {overview !== "" && overview.length > 80
            ? `${overview.slice(0, 80)}...`
            : overview}
        </Overview>
      </HColumn>
    </Movie>
  );
};

export default HMedia;
