import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PayloadModal from "../components/PayloadModal";

describe("PayloadModal", () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it("renderiza el modal con payload JSON formateado", () => {
    const jsonPayload = JSON.stringify({ foo: "bar", count: 5 });
    render(<PayloadModal payload={jsonPayload} onClose={onCloseMock} />);

    // Verificamos título
    expect(screen.getByText("Payload")).toBeInTheDocument();

    // Verificamos contenido formateado
    const pre = screen.getByText(/"foo": "bar"/);
    expect(pre).toBeInTheDocument();
    expect(pre).toHaveTextContent(/"count": 5/);
  });

  it("muestra payload crudo si no es JSON válido", () => {
    const invalidPayload = "texto crudo";
    render(<PayloadModal payload={invalidPayload} onClose={onCloseMock} />);
    expect(screen.getByText("texto crudo")).toBeInTheDocument();
  });

  it("llama a onClose al hacer click en el botón ✕", () => {
    render(<PayloadModal payload="{}" onClose={onCloseMock} />);
    const closeButton = screen.getByText("✕");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
