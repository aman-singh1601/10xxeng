import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "@/components/Movie/pagination.css";
import { initialStateProps, setNewMovies } from "@/features/MovieList";
import Pagination from "@mui/material/Pagination";
import { commonDataProps } from "@/features/commonData";

interface movieProps {
  movie: initialStateProps;
}
export interface SearchByGenreProps {
  commonData: commonDataProps;
}
const MainComponent = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state: movieProps) => state.movie);
  const { searchByGenre } = useSelector(
    (state: SearchByGenreProps) => state.commonData
  );
  const { searchByName } = useSelector(
    (state: SearchByGenreProps) => state.commonData
  );
  const [page, setPage] = useState<number>(1);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getMovies = async (page: number) => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: `${page}`,
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWJhYmUwYWMxMDkzNDkyNGYyMTcxYmQ5NjgwYWFjZSIsInN1YiI6IjY0ODQyOTUyZTM3NWMwMDEzOWJmZWZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-5eV8DKEFVwya3SyHn6kpKbuXXdEU7uNfQPpBuznZQY",
      },
    };

    axios
      .request(options)
      .then(function (res) {
        dispatch(setNewMovies(res.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    if (searchByGenre) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=99babe0ac10934924f2171bd9680aace&page=${page}&with_genres=${searchByGenre}`
        )
        .then((res) => dispatch(setNewMovies(res.data)));
    } else {
      getMovies(page);
    }
    scrollToTop();
  }, [page, searchByGenre]);
  return (
    <div>
      <div className=" flex flex-wrap w-full p-2 justify-center">
        {movies?.results.map(
          (movie, index) =>
            index <= 11 && <MovieCard key={index} moviedata={movie} />
        )}
      </div>
      {!searchByName ? (
        <div className=" flex items-center justify-center m-auto w-full text-white pb-4">
          <Pagination
            className=" justify-center m-auto"
            count={movies?.total_pages}
            color="secondary"
            shape="rounded"
            variant="outlined"
            onChange={(event, value) => {
              event.preventDefault();
              setPage(value);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
export default MainComponent;
