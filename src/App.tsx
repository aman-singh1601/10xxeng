import axios from "axios";
import "./App.css";
import MainComponent, { SearchByGenreProps } from "./components/Movie/Movie";
import { useEffect } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewMovies } from "./features/MovieList";
import { Search } from "lucide-react";
import { setNewMovieName } from "./features/commonData";
import { toast } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const [movieName, setMovieName] = useState("");
  const { borrow } = useSelector(
    (state: SearchByGenreProps) => state.commonData
  );

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query: `${movieName}`,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWJhYmUwYWMxMDkzNDkyNGYyMTcxYmQ5NjgwYWFjZSIsInN1YiI6IjY0ODQyOTUyZTM3NWMwMDEzOWJmZWZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-5eV8DKEFVwya3SyHn6kpKbuXXdEU7uNfQPpBuznZQY",
    },
  };
  useEffect(() => {
    if (borrow !== null) {
      console.log("first");
      toast.error("Endpoint not connected", {
        duration: 4000,
      });
    }
  }, [borrow]);
  const handleClick = () => {
    axios
      .request(options)
      .then(function (response) {
        dispatch(setNewMovies(response.data));
        dispatch(setNewMovieName(true));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className=" h-fit w-full bg-slate-900 ">
      <NavBar />
      <div className="w-full flex justify-end items-center space-x-4 p-2">
        <span className="text-white font-sans font-medium w-fit">
          Search By Name
        </span>
        <div className="relative w-[200px] ">
          <Input
            className=" w-full font-sans font-medium text-slate-700"
            placeholder="Movie Name"
            onChange={(e) => setMovieName(e.target.value)}
          />
          <Search
            className="h-5 w-5 absolute right-2 top-3 transition-all duration-200 hover:cursor-pointer hover:scale-125"
            onClick={handleClick}
          />
        </div>
      </div>
      <MainComponent />
    </div>
  );
}

export default App;
