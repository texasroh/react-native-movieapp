import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";
import { tvAPI, ITv } from "../api";
import HList, { HListSeparator } from "../components/HList";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Tvs = () => {
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvAPI.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvAPI.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvAPI.trending);

  const queryClient = useQueryClient();
  const loading = todayLoading || topLoading || trendingLoading;
  const refreshing = todayRefetching || topRefetching || trendingRefetching;

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </Container>
  );
};

export default Tvs;
