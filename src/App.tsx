import { useEffect, useState } from "react";

import { api } from "./services/api";

import "./styles/global.scss";

import { Content } from "../src/components/Content";
import { SideBar } from "../src/components/SideBar";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response: any) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response: any) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response: any) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <div className="wrapper">
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        setSelectedGenreId={setSelectedGenreId}
      />
      <Content movies={movies} selectedGenre={selectedGenre} />
    </div>
  );
}
