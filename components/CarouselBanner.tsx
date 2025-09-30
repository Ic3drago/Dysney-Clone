"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Movie } from "@/typings";
import Image from "next/image";
import getImagePath from "@/lib/getImagePath";
import { Play, Info } from "lucide-react";

Autoplay.globalOptions = { delay: 8000 };

function CarouselBanner({ movies }: { movies: Movie[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);

  return (
    <div
      className="overflow-hidden lg:-mt-40 relative cursor-pointer group"
      ref={emblaRef}
    >
      <div className="flex">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-full min-w-0 relative">
            <Image
              key={movie.id}
              src={getImagePath(movie.backdrop_path, true)}
              alt=""
              width={1920}
              height={1080}
              className="transition-transform duration-500 group-hover:scale-105"
            />

            <div className="hidden lg:inline absolute mt-0 top-0 pt-40 xl:pt-52 left-0 lg:mt-40 bg-transparent z-20 h-full w-full bg-gradient-to-r from-black/95 via-black/60 to-transparent p-10 space-y-5 text-white">
              <h2 className="text-6xl font-bold max-w-xl z-50 drop-shadow-2xl animate-fade-in">
                {movie.title}
              </h2>
              <p className="max-w-xl line-clamp-3 text-lg leading-relaxed animate-fade-in-delay">
                {movie.overview}
              </p>
              
              <div className="flex space-x-4 pt-4 animate-fade-in-delay-2">
                <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-all duration-200 transform hover:scale-105 shadow-xl">
                  <Play className="w-6 h-6 fill-black" />
                  <span>Play</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-500/70 backdrop-blur-sm text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-500/90 transition-all duration-200 transform hover:scale-105 shadow-xl">
                  <Info className="w-6 h-6" />
                  <span>More Info</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-300 dark:to-[#1A1C29] pointer-events-none" />
    </div>
  );
}

export default CarouselBanner;