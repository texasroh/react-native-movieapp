import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { moviesAPI } from "../api";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

const Container = styled(FlatList<IMovie>)`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

// const TrendingScroll = styled.FlatList`
//   margin-top: 20px;
// `;
const TrendingScroll = styled(FlatList<IMovie>)`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeperator = styled.View`
  width: 20px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
  overview: string;
  release_date?: string;
}

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<{
    results: IMovie[];
  }>(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<{
    results: IMovie[];
  }>(["movies", "upcoming"], moviesAPI.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery<{
    results: IMovie[];
  }>(["movies", "trending"], moviesAPI.trending);

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
    // refetchNowPlaying();
    // refetchTrending();
    // refetchUpcoming();
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshing={refreshing}
      onRefresh={onRefresh}
      // ListHeaderComponentStyle={{ backgroundColor: "black" }}
      // contentContainerStyle={{ backgroundColor: "black" }}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results?.map((movie) => (
              <Slide key={movie.id} movie={movie} />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trendingData?.results}
              keyExtractor={(item) => item.id + ""}
              horizontal
              ItemSeparatorComponent={VSeperator}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <VMedia movie={item} />}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData?.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeperator}
      renderItem={({ item }) => <HMedia movie={item} />}
    />
  );
};

export default Movies;
