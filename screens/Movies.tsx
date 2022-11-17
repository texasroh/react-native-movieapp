import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { makeImgPath } from "../utils";

const API_KEY = "c183a5884681c02c32b9c0dad01728ba";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const View = styled.View`
    flex: 1;
`;

const BgImg = styled.Image`
    flex: 1;
`;

const Poster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);

    const getNowPlaying = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
        )
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setLoading(false);
                setNowPlaying(json.results);
            });
    };
    useEffect(() => {
        getNowPlaying();
    }, []);
    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container>
            <Swiper
                horizontal
                loop
                autoplayTimeout={3.5}
                showsButtons={false}
                showsPagination={false}
                containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
            >
                {nowPlaying.map((movie) => (
                    <View key={movie.id}>
                        <BgImg
                            blurRadius={6}
                            source={{ uri: makeImgPath(movie.backdrop_path) }}
                        />
                        <Poster
                            source={{ uri: makeImgPath(movie.poster_path) }}
                        />
                    </View>
                ))}
            </Swiper>
        </Container>
    );
};

export default Movies;
