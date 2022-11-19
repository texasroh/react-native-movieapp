import { useQuery } from "@tanstack/react-query";
import { FlatList, ScrollView, Text, View } from "react-native";
import { tvAPI, ITv } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";

const Tvs = () => {
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ["tv", "today"],
    tvAPI.airingToday
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ["tv", "top"],
    tvAPI.topRated
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvAPI.trending
  );
  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <FlatList<ITv>
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trendingData.results}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path}
            original_title={item.original_name}
            vote_average={item.vote_average}
          />
        )}
      />
      <FlatList<ITv>
        horizontal
        showsHorizontalScrollIndicator={false}
        data={todayData.results}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path}
            original_title={item.original_name}
            vote_average={item.vote_average}
          />
        )}
      />
      <FlatList<ITv>
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topData.results}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path}
            original_title={item.original_name}
            vote_average={item.vote_average}
          />
        )}
      />
    </ScrollView>
  );
};

export default Tvs;
