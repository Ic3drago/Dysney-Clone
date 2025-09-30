import { Movie } from "@/typings";
import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";

type Props = { title?: string; movies: Movie[]; isVertical?: boolean };

function MoviesCarousel({ title, movies, isVertical }: Props) {
  return (
    <div className="z-50 space-y-4">
      <h2 className="text-2xl font-bold px-10 py-2 hover:text-gray-300 transition-colors duration-200">
        {title}
      </h2>

      <div
        className={cn(
          "flex space-x-6 overflow-scroll scrollbar-hide px-10 py-5",
          isVertical && "flex-col space-x-0 space-y-12"
        )}
      >
        {isVertical
          ? movies.map((movie) => (
              <div
                key={movie.id}
                className={cn(
                  "group hover:bg-white/5 rounded-lg p-5 transition-all duration-300",
                  isVertical &&
                    "flex flex-col space-y-5 mb-5 items-center lg:flex-row lg:space-x-8 lg:space-y-0"
                )}
              >
                <MovieCard movie={movie} />
                <div className="max-w-2xl space-y-3">
                  <p className="font-bold text-xl">
                    {movie.title} ({movie.release_date?.split("-")[0]})
                  </p>
                  <hr className="border-gray-700" />
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
              </div>
            ))
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}

export default MoviesCarousel;