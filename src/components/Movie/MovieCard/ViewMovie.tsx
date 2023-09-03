import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Result } from "@/features/MovieList";
import { useDispatch } from "react-redux";
import { setBorrow } from "@/features/commonData";

const ViewMovie = ({
  children,
  movieDetails,
}: {
  children: React.ReactNode;
  movieDetails: Result;
}) => {
  const base_url = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();
  const handleClick = () => {
    //make an api request
    dispatch(setBorrow(movieDetails.id));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-800">
        <DialogHeader></DialogHeader>
        <div className="flex flex-col space-y-2">
          <img
            className="w-full h-52 object-cover"
            src={`${base_url}${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <span className="text-white font-serif font-medium">
            {movieDetails.title}
          </span>
          <span className="text-white font-sans text-xs font-medium">
            {movieDetails.overview}
          </span>
          <div>
            <span className="text-slate-500 font-serif font-medium mr-2">
              Release Date :
            </span>
            <span className="text-white font-sans font-medium">
              {movieDetails.release_date}
            </span>
          </div>
          <div>
            <span className="text-slate-500 font-serif font-medium mr-2">
              Votes :
            </span>
            <span className="text-white font-sans font-medium">
              {movieDetails.vote_count}
            </span>
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button className="border-none" onClick={handleClick}>
              Borrow
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMovie;
