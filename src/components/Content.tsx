import { MovieCard } from "./MovieCard";
import "../styles/content.scss";

export function Content({ movies, selectedGenre }: any) {
  console.log("🚀 ~ file: Content.tsx ~ line 2 ~ Content ~ movies", movies);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="container">
        <header>
          <span className="category">
            Categoria:<span> {selectedGenre.title}</span>
          </span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                runtime={movie.Runtime}
                rating={movie.Ratings[0].Value}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
