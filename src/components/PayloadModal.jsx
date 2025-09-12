import React from "react";

export default function PayloadModal({ payload, onClose }) {
  let formattedPayload;

  try {
    // Intentamos parsear el JSON
    const parsed = JSON.parse(payload);
    formattedPayload = JSON.stringify(parsed, null, 2);
  } catch (e) {
    // Si falla, mostramos el texto crudo
    formattedPayload = payload;
  }

  return (
    <div className="fixed inset-0 bg-black/[0.75] flex items-center justify-center z-50">
      <div className="bg-[#2d2d2d] text-gray-200 rounded-2xl shadow-lg w-3/4 max-w-2xl p-6 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-400 text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4">Payload</h2>

        <pre className="bg-[#1e1e1e] p-4 rounded-lg overflow-auto max-h-[70vh] text-sm whitespace-pre-wrap">
          {formattedPayload}
        </pre>
      </div>
    </div>
  );
}
