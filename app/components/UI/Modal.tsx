import { X } from "lucide-react";
import { ModalProps } from "../types";

export function Modal({
  modalOpen,
  modalClose,
  title,
  message,
  onConfirm,
}: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        modalOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={modalClose}
    >
      <div
        className={`w-full max-w-md bg-neutral-900 border border-white/20 rounded-sm shadow-2xl p-6 flex flex-col transition-all duration-300 ease-out transform ${
          modalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <h3 className="text-white text-base font-bold">{title}</h3>

          <button
            type="button"
            onClick={modalClose}
            className="text-neutral-400 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-neutral-300 mb-6">{message}</p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={modalClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-sm text-neutral-300 text-xs font-medium cursor-pointer transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 border border-rose-500/40 rounded-sm text-white text-xs font-semibold cursor-pointer transition-all"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
