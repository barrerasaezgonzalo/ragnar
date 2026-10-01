import Image from "next/image";
import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="relative w-full min-h-screen font-ragnar tracking-wide flex flex-col">
      <Image
        src="/ragnar/bg.png"
        alt="Ragnar"
        fill
        priority
        className="fixed inset-0 w-full h-full object-cover object-[95%_5%] -z-10"
      />

      <section className="w-full flex flex-1 items-center justify-center relative z-10">
        <div className="flex flex-col items-center justify-center gap-3 text-white">
          <LoaderCircle size={32} className="animate-spin text-white/70" />

          <span className="text-sm text-white/70">Cargando...</span>
        </div>
      </section>
    </div>
  );
}
