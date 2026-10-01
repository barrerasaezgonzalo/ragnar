"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);

    try {
      await loginWithGoogle();
    } catch {
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-ragnar tracking-wide">
      <Image
        src="/ragnar/bg.png"
        alt="Ragnar"
        fill
        priority
        className="fixed inset-0 -z-10 h-full w-full object-cover object-[95%_5%]"
      />

      <div className="absolute inset-0 -z-10 bg-black/35" />

      <section className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-black/40 p-8 text-white shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <User className="h-8 w-8 text-white/70" />
            </div>

            <h1 className="text-2xl font-semibold">Bienvenido a Ragnar</h1>

            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Inicia sesión para acceder a tu espacio de trabajo.
            </p>

            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="mt-8 flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-white px-4 text-sm font-medium text-neutral-900 shadow-lg transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-base font-semibold">G</span>

              {isLoggingIn ? "Conectando..." : "Continuar con Google"}
            </button>

            <p className="mt-6 text-xs text-white/35">
              Tu espacio personal para organizar lo importante.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
