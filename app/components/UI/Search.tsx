import { SearchProps } from "@/app/types";
import { X, Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export function Search({ searchQuery, setSearchQuery }: SearchProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="relative flex items-center bg-black/40 text-white/60 text-sm border border-white/40 focus-within:border-white/60 rounded-sm">
      <span className="absolute left-3 pointer-events-none z-10">
        <SearchIcon size={16} />
      </span>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsSearchOpen(true)}
        onBlur={() => {
          if (!searchQuery) {
            setIsSearchOpen(false);
          }
        }}
        placeholder="Buscar..."
        className={`py-2 pl-9 text-white/80 placeholder-white/60 focus:outline-none  transition-all duration-300 ease-in-out ${
          isSearchOpen || searchQuery ? "w-80" : "w-60"
        }`}
      />

      {(isSearchOpen || searchQuery) && (
        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
            setIsSearchOpen(false);
          }}
          className="absolute right-3 hover:text-white/80 z-10 cursor-pointer"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}
