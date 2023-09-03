import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Result } from "@/features/MovieList";
import ViewMovie from "./ViewMovie";
import { Badge } from "@/components/ui/badge";
import { genreWithId } from "@/fetchRequest";

export function MovieCard({ moviedata }: { moviedata: Result }) {
  const base_url = "https://image.tmdb.org/t/p/original";
  return (
    <>
      <ViewMovie movieDetails={moviedata}>
        <Card className="w-fit border-none relative overflow-hidden m-2 bg-slate-800 sm:w-[300px] md:w-[350px]">
          <span className="text-white absolute px-2 font-sans font-medium ">
            {moviedata.title}
          </span>
          <CardHeader>
            <img
              className="w-full rounded-md"
              src={`${base_url}${moviedata.backdrop_path}`}
            />
          </CardHeader>
          <CardContent>
            <div className="my-2">
              {moviedata.genre_ids.map((id) => {
                const name = genreWithId.find((genre) => genre.id === id)?.name;
                return (
                  <Badge key={id} variant="secondary" className="mr-2">
                    {name}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </ViewMovie>
    </>
  );
}
