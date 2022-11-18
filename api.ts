const API_KEY = "c183a5884681c02c32b9c0dad01728ba";
const BASE_URL = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IBaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface IMovieResponse extends IBaseResponse {
  results: IMovie[];
}

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((response) =>
    response.json()
  );

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((response) => response.json());

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((response) => response.json());

export const moviesAPI = { trending, upcoming, nowPlaying };
