import Image from "next/image";
import { ThemeToggler } from "./ThemeToggler";
import Link from "next/link";
import GenreDropdown from "./GenreDropdown";
import SearchInput from "./SearchInput";

function Header() {
  return (
    <header className="fixed w-full z-20 top-0 flex items-center justify-between p-5 backdrop-blur-md bg-gradient-to-b from-black/80 via-black/50 to-transparent transition-all duration-300">
      <Link href="/" className="mr-10 transform hover:scale-105 transition-transform duration-200">
        <Image
          src="https://links.papareact.com/a943ae"
          width={120}
          height={100}
          alt="Disney Logo"
          className="cursor-pointer invert drop-shadow-2xl"
        />
      </Link>

      <div className="flex space-x-4 items-center">
        <GenreDropdown />
        <SearchInput />
        <ThemeToggler />
      </div>
    </header>
  );
}

export default Header;