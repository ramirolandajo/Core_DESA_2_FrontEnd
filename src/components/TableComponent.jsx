import React, { useEffect, useState } from "react";
import api from "../api/api";
import PayloadModal from "./PayloadModal";
import FilterModal from "./FilterModal";
import { Filter } from "lucide-react"; // ícono de filtro

export default function TableComponent({ endpoint }) {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedPayload, setSelectedPayload] = useState(null);

  // 🔎 estados para búsqueda y filtros
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    modules: [],
    types: [],
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const fetchData = async (endpoint) => {
    const res = await api.get(`/core/${endpoint}`);
    console.log(res.data)
    setAllData(res.data);
    setData(res.data);
  };

  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yy} ${hh}:${min}`;
  };

  // 📌 obtener listas únicas
  const uniqueTypes = [...new Set(allData.map((item) => item.type.split(":")[0].trim()))];
  const uniqueModules = [...new Set(allData.map((item) => item.originModule))];

  // 📌 aplicar filtros
  const filteredData = data.filter((item) => {
    const [method, description] = item.type.split(":").map((s) => s.trim());

    // fecha
    if (filters.fromDate && new Date(item.timestamp) < new Date(filters.fromDate)) return false;
    if (filters.toDate && new Date(item.timestamp) > new Date(filters.toDate)) return false;

    // módulos
    if (filters.modules.length > 0 && !filters.modules.includes(item.originModule)) return false;

    // tipos
    if (filters.types.length > 0 && !filters.types.includes(method)) return false;

    // búsqueda
    const searchLower = search.toLowerCase();
    return (
      item.eventId.toString().includes(searchLower) ||
      description.toLowerCase().includes(searchLower) ||
      item.payload?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full h-[90vh] overflow-y-auto rounded-2xl p-4">
      {/* 🔎 Barra de búsqueda y botón de filtros */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-[#2d2d2d] text-white"
        />
        <button
          onClick={() => setShowFilterModal(true)}
          className="p-2 rounded-lg bg-[#2d2d2d] hover:bg-[#3a3a3a]"
        >
          <Filter className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* 📋 Tabla */}
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="sticky top-0 bg-[#2d2d2d] text-white uppercase text-xs">
          <tr>
            <th className="px-4 py-2">EventId</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Payload</th>
            <th className="px-4 py-2">Origin</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice().reverse().map((item, index) => {
            const [method, description] = item.type.split(":").map((s) => s.trim());
            return (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-[#242424]"
              >
                <td className="px-4 py-2">{item.eventId}</td>
                <td className="px-4 py-2">{method}</td>
                <td className="px-4 py-2">{description}</td>
                <td
                  className="px-4 py-2 max-w-xs truncate break-words overflow-hidden cursor-pointer hover:underline"
                  onClick={() => setSelectedPayload(item.payload)}
                >
                  {item.payload}
                </td>
                <td className="px-4 py-2">{item.originModule}</td>
                <td className="px-4 py-2">{formatDate(item.timestamp || item.movedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal Payload */}
      {selectedPayload && (
        <PayloadModal
          payload={selectedPayload}
          onClose={() => setSelectedPayload(null)}
        />
      )}

      {/* Modal Filtros */}
      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onApply={setFilters}
          originModules={uniqueModules}
          eventTypes={uniqueTypes}
          initialFilters={filters}
        />
      )}
    </div>
  );
}
