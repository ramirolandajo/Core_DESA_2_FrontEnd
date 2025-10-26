// src/test/NavBar.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
  it("renders all links", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText("🌱 Vivos")).toBeDefined();
    expect(screen.getByText("🔄 Reintentos")).toBeDefined();
    expect(screen.getByText("🧟 Muertos")).toBeDefined();
  });

  it('highlights "Vivos" link when route is "/"', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NavBar />
      </MemoryRouter>
    );

    const vivosLink = screen.getByText("🌱 Vivos");
    const reintentosLink = screen.getByText("🔄 Reintentos");
    const muertosLink = screen.getByText("🧟 Muertos");

    expect(vivosLink).toHaveClass("bg-[#242424]");
    expect(reintentosLink).not.toHaveClass("bg-[#242424]");
    expect(muertosLink).not.toHaveClass("bg-[#242424]");
  });

  it('highlights "Muertos" link when route is "/dead"', () => {
    render(
      <MemoryRouter initialEntries={["/dead"]}>
        <NavBar />
      </MemoryRouter>
    );

    const vivosLink = screen.getByText("🌱 Vivos");
    const reintentosLink = screen.getByText("🔄 Reintentos");
    const muertosLink = screen.getByText("🧟 Muertos");

    expect(vivosLink).not.toHaveClass("bg-[#242424]");
    expect(reintentosLink).not.toHaveClass("bg-[#242424]");
    expect(muertosLink).toHaveClass("bg-[#242424]");
  });
});
