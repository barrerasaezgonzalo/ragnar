import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "./Modal";

export function User() {
  const { handleLogout } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsLogoutOpen(true)}
        type="button"
        className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center overflow-hidden focus:outline-none"
      >
        <Image
          src="/ragnar/avatar.png"
          alt="Logout"
          width={40}
          height={40}
          className="w-full h-full object-cover cursor-pointer"
        />
      </button>

      <Modal
        modalOpen={isLogoutOpen}
        modalClose={() => setIsLogoutOpen(false)}
        title="¿Cerrar sesión?"
        message="¿Estás seguro de que deseas cerrar sesión?"
        onConfirm={handleLogout}
      />
    </div>
  );
}
