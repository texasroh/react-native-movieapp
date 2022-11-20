import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components/native";
import { moviesAPI, tvAPI } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");

  const {
    isInitialLoading: moviesIsLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesAPI.search, { enabled: false });

  const {
    isInitialLoading: tvsIsLoading,
    data: tvsData,
    refetch: searchTvs,
  } = useQuery(["searchTvs", query], tvAPI.search, { enabled: false });

  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTvs();
  };
  return (
    <Container>
      <SearchBar
        onChangeText={onChangeText}
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="gray"
        returnKeyLabel="Search"
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {moviesIsLoading || tvsIsLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvsData ? <HList title="Tv Results" data={tvsData.results} /> : null}
    </Container>
  );
};

export default Search;
