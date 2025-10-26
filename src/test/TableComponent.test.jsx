// src/tests/TableComponent.test.jsx
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

// Mock simple de Redux
vi.mock("react-redux", () => ({
  useSelector: vi.fn(() => []),
  useDispatch: () => vi.fn(),
}));

// Mock correcto del API con default
vi.mock("../api/api", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
  },
}));

// Mock de los modales
vi.mock("../components/PayloadModal", () => ({
  default: ({ onClose }) => (
    <div data-testid="payload-modal" onClick={onClose}>
      PayloadModal
    </div>
  ),
}));

vi.mock("../components/FilterModal", () => ({
  default: ({ onClose }) => (
    <div data-testid="filter-modal" onClick={onClose}>
      FilterModal
    </div>
  ),
}));

// Importamos el componente
import TableComponent from "../components/TableComponent";

describe("TableComponent básico", () => {
  it("renderiza sin romperse", async () => {
    render(<TableComponent endpoint="test-endpoint" />);

    const searchInput = screen.getByPlaceholderText("Buscar...");
    expect(searchInput).toBeDefined();

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
  });
});
