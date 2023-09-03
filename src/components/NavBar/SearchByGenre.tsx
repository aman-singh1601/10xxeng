import * as React from "react";
import { Check, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { setNewGenre } from "@/features/commonData";

interface genreProps {
  id: number;
  name: string;
}

export function SearchMovie() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(null);
  const [genres, setGenre] = React.useState<genreProps[] | []>([]);
  const getGenres = () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      params: { language: "en" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWJhYmUwYWMxMDkzNDkyNGYyMTcxYmQ5NjgwYWFjZSIsInN1YiI6IjY0ODQyOTUyZTM3NWMwMDEzOWJmZWZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-5eV8DKEFVwya3SyHn6kpKbuXXdEU7uNfQPpBuznZQY",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setGenre(response.data.genres);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  React.useEffect(() => {
    getGenres();
  }, []);

  React.useEffect(() => {
    if (value !== null) {
      dispatch(setNewGenre(value));
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? genres.find((genre) => genre.id === value)?.name
            : "Search By Genre.."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search genre..." />
          <CommandEmpty>No genre found.</CommandEmpty>
          <CommandGroup>
            {genres.map((genre) => (
              <CommandItem
                key={genre.id}
                onSelect={() => {
                  setValue(genre.id === value ? null : genre.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === genre.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {genre.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
