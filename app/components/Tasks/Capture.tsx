import { CaptureProps } from "@/app/types";
import { X, SendHorizonal } from "lucide-react";
import { useState } from "react";

export function Capture({ openDrawer }: CaptureProps) {
  const [captureText, setCaptureText] = useState("");

  return (
    <div className="relative w-sm flex items-center mb-4 mr-2 mt-4">
      <input
        autoFocus
        type="text"
        value={captureText}
        onChange={(e) => setCaptureText(e.target.value)}
        placeholder="Captura rápida..."
        className="w-full bg-black/10 backdrop-blur-md border border-white/40 rounded-sm pl-3 py-2 text-sm text-white/60 placeholder-white/40 focus:outline-none focus:border-white/60"
      />

      {captureText && (
        <div className="absolute right-1 flex items-center gap-1 mr-2">
          <button
            type="button"
            onClick={() => setCaptureText("")}
            className="text-white/60 hover:text-white/80 cursor-pointer"
            title="Eliminar captura"
          >
            <X size={17} />
          </button>

          <button
            type="button"
            disabled={captureText.length < 5}
            className="text-white/60 hover:text-white/80 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => {
              openDrawer("task", {
                type: "task",
                data: {
                  title: captureText,
                  status: "inbox",
                  context: "digital",
                },
              });
              setCaptureText("");
            }}
          >
            <SendHorizonal size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
