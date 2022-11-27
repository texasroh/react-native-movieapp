import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { IMovie, IMovieResponse, moviesAPI } from "../api";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { useState } from "react";

const Container = styled(FlatList<IMovie>)`
  background-color: ${(props) => props.theme.mainBgColor};
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

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    // isRefetching: isRefetchingNowPlaying,
  } = useQuery<IMovieResponse>(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    // isRefetching: isRefetchingUpcoming,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<IMovieResponse>(
    ["movies", "upcoming"],
    moviesAPI.upcoming,
    {
      getNextPageParam: (currentPage, pages) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );
  console.log(upcomingData?.pages.map((page) => page.results));
  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: refetchTrending,
    // isRefetching: isRefetchingTrending,
  } = useQuery<IMovieResponse>(["movies", "trending"], moviesAPI.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
    // refetchNowPlaying();
    // refetchTrending();
    // refetchUpcoming();
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  // const refreshing =
  //   isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <Container
      onEndReached={loadMore}
      onEndReachedThreshold={0.8}
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
          {/* <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData ? (
              <TrendingScroll
                data={trendingData.results}
                keyExtractor={(item) => item.id + ""}
                horizontal
                ItemSeparatorComponent={VSeperator}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <VMedia
                    original_title={item.original_title}
                    poster_path={item.poster_path}
                    vote_average={item.vote_average}
                  />
                )}
              />
            ) : null}
          </ListContainer> */}
          <HList title="Trending Movies" data={trendingData!.results} />
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      //   data={upcomingData.results}
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeperator}
      renderItem={({ item }) => <HMedia media={item} />}
    />
  ) : null;
};

export default Movies;
