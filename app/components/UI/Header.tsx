import { SITES } from "@/app/constants";
import { User } from "./User";
import { Search } from "./Search";
import { getFormattedToday } from "@/app/utils";
import { useNextHoliday } from "@/app/hooks/useNextHoliday";
import { HeaderProps } from "@/app/types";
import Image from "next/image";

export const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
  const formatedDate = getFormattedToday();
  const { holiday } = useNextHoliday();

  return (
    <>
      <Image
        src="/ragnar/bg.png"
        alt="Ragnar"
        fill
        priority
        className="fixed inset-0 w-full h-full object-cover object-[95%_5%] -z-10"
      />

      <header className="w-full px-8 py-2 flex items-center justify-between text-white border-b border-white/20 flex-shrink-0 z-30 bg-black/40">
        <div className="flex flex-col gap-1">
          <Image src="/ragnar/logo.png" width={150} height={150} alt="Ragnar" />

          <p className="text-neutral-300 text-xs pl-2 first-letter:uppercase lowercase">
            {formatedDate}, próximo festivo en {holiday?.days_until} días.
          </p>
        </div>

        <nav className="flex gap-4 text-sm font-medium">
          {SITES.map((item) => (
            <a
              href={item.url}
              key={item.key}
              className="group relative hover:contrast-150 transition-colors flex flex-col items-start cursor-pointer"
              target={item.url === "#" ? "_self" : "_blank"}
            >
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={`/${item.key}/icon.png`}
                  width={25}
                  height={25}
                  alt={item.name}
                />

                <span>{item.name}</span>
              </div>

              <span className="absolute top-full left-0 whitespace-nowrap text-xs text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100">
                {item.description}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6 mr-1">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <User />
        </div>
      </header>
    </>
  );
};
