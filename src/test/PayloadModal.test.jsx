// src/test/PayloadModal.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PayloadModal from "../components/PayloadModal";

describe("PayloadModal", () => {
  const mockOnClose = vi.fn();

  it("renders correctly with JSON payload", () => {
    const payload = JSON.stringify({ key: "value" });

    render(<PayloadModal payload={payload} onClose={mockOnClose} />);

    // Debe mostrar el JSON formateado
    expect(screen.getByText(/"key": "value"/)).toBeDefined();
  });

  it("renders correctly with plain text payload", () => {
    const payload = "Some plain text";

    render(<PayloadModal payload={payload} onClose={mockOnClose} />);

    expect(screen.getByText("Some plain text")).toBeDefined();
  });

  it("calls onClose when close button is clicked", () => {
    const payload = "{}";

    render(<PayloadModal payload={payload} onClose={mockOnClose} />);

    const closeButton = screen.getByText("✕");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
