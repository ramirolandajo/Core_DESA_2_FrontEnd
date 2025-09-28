import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import FilterModal from "../components/FilterModal";

describe("FilterModal", () => {
  const mockOnClose = vi.fn();
  const mockOnApply = vi.fn();
  const originModules = ["ModuleA", "ModuleB"];
  const eventTypes = ["INFO", "ERROR"];
  const initialFilters = {
    fromDate: "",
    toDate: "",
    modules: [],
    types: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente el modal con todos los elementos", () => {
    render(
      <FilterModal
        onClose={mockOnClose}
        onApply={mockOnApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Fecha")).toBeInTheDocument();
    expect(screen.getByText("OriginModule")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  it("permite cambiar fechas y resetearlas", () => {
    render(
      <FilterModal
        onClose={mockOnClose}
        onApply={mockOnApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    const fromInput = screen.getAllByRole("textbox")[0];
    const toInput = screen.getAllByRole("textbox")[1];

    fireEvent.change(fromInput, { target: { value: "2025-09-28T10:00" } });
    fireEvent.change(toInput, { target: { value: "2025-09-28T12:00" } });

    expect(fromInput.value).toBe("2025-09-28T10:00");
    expect(toInput.value).toBe("2025-09-28T12:00");

    fireEvent.click(screen.getByText("Resetear fechas"));

    expect(fromInput.value).toBe("");
    expect(toInput.value).toBe("");
  });

  it("permite seleccionar y resetear módulos", () => {
    render(
      <FilterModal
        onClose={mockOnClose}
        onApply={mockOnApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    const moduleAButton = screen.getByText("ModuleA");
    fireEvent.click(moduleAButton);
    expect(moduleAButton).toHaveClass("bg-blue-600");

    fireEvent.click(screen.getByText("Resetear módulos"));
    expect(moduleAButton).toHaveClass("bg-[#1e1e1e]");
  });

  it("permite seleccionar y resetear tipos", () => {
    render(
      <FilterModal
        onClose={mockOnClose}
        onApply={mockOnApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    const infoButton = screen.getByText("INFO");
    fireEvent.click(infoButton);
    expect(infoButton).toHaveClass("bg-green-600");

    fireEvent.click(screen.getByText("Resetear tipos"));
    expect(infoButton).toHaveClass("bg-[#1e1e1e]");
  });

  it("llama a onApply y onClose al presionar Guardar", () => {
    render(
      <FilterModal
        onClose={mockOnClose}
        onApply={mockOnApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    const moduleAButton = screen.getByText("ModuleA");
    const infoButton = screen.getByText("INFO");

    fireEvent.click(moduleAButton);
    fireEvent.click(infoButton);

    fireEvent.click(screen.getByText("Guardar"));

    expect(mockOnApply).toHaveBeenCalledWith({
      fromDate: "",
      toDate: "",
      modules: ["ModuleA"],
      types: ["INFO"],
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("llama a onClose al presionar Cancelar o la X", () => {
    render(
      <FilterModal
        onClose={mockOnClose}
        onApply={mockOnApply}
        originModules={originModules}
        eventTypes={eventTypes}
        initialFilters={initialFilters}
      />
    );

    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    const closeXButton = screen.getAllByRole("button")[0]; // primer botón = X
    fireEvent.click(closeXButton);
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });
});
