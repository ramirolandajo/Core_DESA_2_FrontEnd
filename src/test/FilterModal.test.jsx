// src/test/FilterModal.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterModal from "../components/FilterModal";

describe("FilterModal", () => {
  const originModules = ["Module1", "Module2"];
  const eventTypes = ["Type1", "Type2"];
  const initialFilters = {
    fromDate: "2025-10-26T10:00",
    toDate: "2025-10-26T12:00",
    modules: ["Module1"],
    types: ["Type2"],
  };

  const onClose = vi.fn();
  const onApply = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with initial values", () => {
    render(
      <FilterModal
        onClose={onClose}
        onApply={onApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    // Inputs de fecha
    const dateInputs = screen.getAllByDisplayValue(/2025-10-26T1[0-2]:/);
    expect(dateInputs).toHaveLength(2);

    // Botones de módulos y tipos
    expect(screen.getByText("Module1")).toHaveClass("bg-blue-600");
    expect(screen.getByText("Module2")).toHaveClass("bg-[#1e1e1e]");
    expect(screen.getByText("Type2")).toHaveClass("bg-green-600");
    expect(screen.getByText("Type1")).toHaveClass("bg-[#1e1e1e]");
  });

  it("allows resetting dates", () => {
    render(
      <FilterModal
        onClose={onClose}
        onApply={onApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    fireEvent.click(screen.getByText("Resetear fechas"));

    // Verificamos que ambos inputs están vacíos
    const dateInputs = screen.getAllByDisplayValue("");
    expect(dateInputs).toHaveLength(2);
  });

  it("allows selecting and deselecting modules and types", () => {
    render(
      <FilterModal
        onClose={onClose}
        onApply={onApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={{ modules: [], types: [] }}
      />
    );

    // Selección y deselección de módulo
    const moduleBtn = screen.getByText("Module1");
    fireEvent.click(moduleBtn);
    expect(moduleBtn).toHaveClass("bg-blue-600");
    fireEvent.click(moduleBtn);
    expect(moduleBtn).toHaveClass("bg-[#1e1e1e]");

    // Selección y deselección de tipo
    const typeBtn = screen.getByText("Type1");
    fireEvent.click(typeBtn);
    expect(typeBtn).toHaveClass("bg-green-600");
    fireEvent.click(typeBtn);
    expect(typeBtn).toHaveClass("bg-[#1e1e1e]");
  });

  it("calls onApply with correct values and onClose when Guardar is clicked", () => {
    render(
      <FilterModal
        onClose={onClose}
        onApply={onApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    fireEvent.click(screen.getByText("Guardar"));
    expect(onApply).toHaveBeenCalledWith(initialFilters);
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when Cancelar is clicked", () => {
    render(
      <FilterModal
        onClose={onClose}
        onApply={onApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });

  it("allows resetting modules and types", () => {
    render(
      <FilterModal
        onClose={onClose}
        onApply={onApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={{ modules: ["Module1"], types: ["Type1"] }}
      />
    );

    // Resetear módulos
    fireEvent.click(screen.getByText("Resetear módulos"));
    expect(screen.getByText("Module1")).toHaveClass("bg-[#1e1e1e]");
    expect(screen.getByText("Module2")).toHaveClass("bg-[#1e1e1e]");

    // Resetear tipos
    fireEvent.click(screen.getByText("Resetear tipos"));
    expect(screen.getByText("Type1")).toHaveClass("bg-[#1e1e1e]");
    expect(screen.getByText("Type2")).toHaveClass("bg-[#1e1e1e]");
  });
});
