import getImagePath from "@/lib/getImagePath";
import { Movie } from "@/typings";
import Image from "next/image";

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="flex-shrink-0 relative cursor-pointer transform hover:scale-110 transition-all duration-300 ease-out hover:z-50 group">
      {/* Gradiente overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10 rounded-lg" />
      
      {/* Glow effect en hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

      {/* Título */}
      <div className="absolute z-20 bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-semibold text-sm md:text-base line-clamp-2 drop-shadow-lg">
          {movie.title}
        </p>
        <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>

      {/* Imagen */}
      <Image
        className="w-fit lg:min-w-[400px] h-56 object-cover object-center shadow-2xl rounded-lg ring-1 ring-white/10"
        src={getImagePath(movie.backdrop_path || movie.poster_path)}
        alt={movie.title}
        width={1920}
        height={1080}
        key={movie.id}
      />
    </div>
  );
}

export default MovieCard;