import React from 'react'

import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  // Función para determinar si un botón está activo
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#2d2d2d] text-white px-6 py-3 flex items-center">
      {/* Título */}
      <span className="font-bold text-lg mr-6">Eventos</span>

      {/* Botones */}
      <div className="flex space-x-4">
        <Link
          to="/"
          className={`px-4 py-2 rounded-lg transition-colors ${
            isActive("/") ? "bg-[#242424]" : "hover:bg-[#242424]"
          }`}
        >
          🌱 Alive
        </Link>

        <Link
          to="/retries"
          className={`px-4 py-2 rounded-lg transition-colors ${
            isActive("/retries") ? "bg-[#242424]" : "hover:bg-[#242424]"
          }`}
        >
          🔄 Retries
        </Link>

        <Link
          to="/dead"
          className={`px-4 py-2 rounded-lg transition-colors ${
            isActive("/dead") ? "bg-[#242424]" : "hover:bg-[#242424]"
          }`}
        >
          🧟 Dead
        </Link>
      </div>
    </nav>
  );
}
