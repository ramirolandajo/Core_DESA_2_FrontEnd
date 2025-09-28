import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // librería de íconos (lucide-react)

export default function FilterModal({
    onClose,
    onApply,
    originModules,
    eventTypes,
    initialFilters,
}) {
    const [fromDate, setFromDate] = useState(initialFilters.fromDate || "");
    const [toDate, setToDate] = useState(initialFilters.toDate || "");
    const [selectedModules, setSelectedModules] = useState(initialFilters.modules || []);
    const [selectedTypes, setSelectedTypes] = useState(initialFilters.types || []);

    // toggle para whitelist
    const toggleSelection = (list, setList, value) => {
        if (list.includes(value)) {
            setList(list.filter((item) => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    const resetDates = () => {
        setFromDate("");
        setToDate("");
    };

    const resetModules = () => {
        setSelectedModules([]);
    };

    const resetTypes = () => {
        setSelectedTypes([]);
    };

    const handleApply = () => {
        onApply({
            fromDate,
            toDate,
            modules: selectedModules,
            types: selectedTypes,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-[#2d2d2d] text-white rounded-2xl p-6 w-[500px] shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Filtros</h2>
                    <button onClick={onClose}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Fecha */}
                <div className="mb-4">
                    <h3 className="font-medium mb-2">Fecha</h3>
                    <div className="flex gap-2">
                        <input
                            type="datetime-local"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="p-2 rounded-lg bg-[#1e1e1e] text-white w-full"
                        />
                        <input
                            type="datetime-local"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="p-2 rounded-lg bg-[#1e1e1e] text-white w-full"
                        />
                    </div>
                    <button
                        onClick={resetDates}
                        className="text-sm mt-1 text-blue-400 hover:underline"
                    >
                        Resetear fechas
                    </button>
                </div>

                {/* OriginModule */}
                <div className="mb-4">
                    <h3 className="font-medium mb-2">OriginModule</h3>
                    <div className="flex flex-wrap gap-2">
                        {originModules.map((mod) => (
                            <button
                                key={mod}
                                onClick={() => toggleSelection(selectedModules, setSelectedModules, mod)}
                                className={`px-3 py-1 rounded-lg text-sm ${selectedModules.includes(mod)
                                        ? "bg-blue-600"
                                        : "bg-[#1e1e1e]"
                                    }`}
                            >
                                {mod}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={resetModules}
                        className="text-sm mt-1 text-blue-400 hover:underline"
                    >
                        Resetear módulos
                    </button>
                </div>

                {/* Type */}
                <div className="mb-4">
                    <h3 className="font-medium mb-2">Type</h3>
                    <div className="flex flex-wrap gap-2">
                        {eventTypes.map((t) => (
                            <button
                                key={t}
                                onClick={() => toggleSelection(selectedTypes, setSelectedTypes, t)}
                                className={`px-3 py-1 rounded-lg text-sm ${selectedTypes.includes(t)
                                        ? "bg-green-600"
                                        : "bg-[#1e1e1e]"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={resetTypes}
                        className="text-sm mt-1 text-blue-400 hover:underline"
                    >
                        Resetear tipos
                    </button>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
