import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import TableComponent from "../components/TableComponent";
import api from "../api/api";

// 🔹 Mock de api
vi.mock("../api/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

// 🔹 Mock de PayloadModal
vi.mock("../components/PayloadModal", () => ({
  default: ({ payload, onClose }) =>
    <div data-testid="payload-modal">
      <p>{payload}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
}));

// 🔹 Mock de FilterModal
vi.mock("../components/FilterModal", () => ({
  default: ({ onClose }) =>
    <div data-testid="filter-modal">
      <button onClick={onClose}>Cerrar Filtros</button>
    </div>
}));

describe("TableComponent", () => {
  const mockData = [
    {
      eventId: 1,
      type: "INFO: Test event",
      payload: "Payload 1",
      originModule: "ModuleA",
      timestamp: "2025-09-28T12:00:00Z",
    },
    {
      eventId: 2,
      type: "ERROR: Another event",
      payload: "Payload 2",
      originModule: "ModuleB",
      timestamp: "2025-09-28T13:00:00Z",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    api.get.mockResolvedValue({ data: mockData });
  });

  it("llama a la API con el endpoint correcto y muestra los datos", async () => {
    render(<TableComponent endpoint="logs" />);

    expect(api.get).toHaveBeenCalledWith("/core/logs");

    // espera que se muestren los datos
    expect(await screen.findByText("1")).toBeInTheDocument();
    expect(screen.getByText("INFO")).toBeInTheDocument();
    expect(screen.getByText("Test event")).toBeInTheDocument();
    expect(screen.getByText("Payload 1")).toBeInTheDocument();
    expect(screen.getByText("ModuleA")).toBeInTheDocument();
  });

  it("filtra resultados con el input de búsqueda", async () => {
    render(<TableComponent endpoint="logs" />);

    await waitFor(() => {
      expect(screen.getByText("Payload 1")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Buscar...");
    fireEvent.change(searchInput, { target: { value: "Another" } });

    expect(screen.queryByText("Payload 1")).not.toBeInTheDocument();
    expect(screen.getByText("Payload 2")).toBeInTheDocument();
  });

  it("abre el modal de payload al hacer click en el payload", async () => {
    render(<TableComponent endpoint="logs" />);

    const payloadCell = await screen.findByText("Payload 1");
    fireEvent.click(payloadCell);

    expect(await screen.findByTestId("payload-modal")).toBeInTheDocument();
    expect(screen.getByText("Payload 1")).toBeInTheDocument();
  });

  it("abre el modal de filtros al presionar el botón de filtro", async () => {
    render(<TableComponent endpoint="logs" />);

    const filterButton = screen.getByRole("button");
    fireEvent.click(filterButton);

    expect(await screen.findByTestId("filter-modal")).toBeInTheDocument();
  });
});
