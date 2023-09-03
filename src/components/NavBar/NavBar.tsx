import { SearchMovie } from "./SearchByGenre";

export const NavBar = () => {
  return (
    <div className="w-full p-2 z-10 flex justify-between ease-in duration-300 bg-slate-800 items-center">
      <span className="text-white text-xl">Go Movies</span>
      <SearchMovie />
    </div>
  );
};
