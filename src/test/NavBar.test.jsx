import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar", () => {

  const renderWithRouter = (initialRoute = "/") => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="*" element={<NavBar />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renderiza todos los links correctamente", () => {
    renderWithRouter();
    expect(screen.getByText("🌱 Alive")).toBeInTheDocument();
    expect(screen.getByText("🔄 Retries")).toBeInTheDocument();
    expect(screen.getByText("🧟 Dead")).toBeInTheDocument();
  });

  it("resalta el link activo según la ruta '/'", () => {
    renderWithRouter("/");
    const aliveLink = screen.getByText("🌱 Alive");
    expect(aliveLink).toHaveClass("bg-[#242424]");
    
    const retriesLink = screen.getByText("🔄 Retries");
    expect(retriesLink).not.toHaveClass("bg-[#242424]");

    const deadLink = screen.getByText("🧟 Dead");
    expect(deadLink).not.toHaveClass("bg-[#242424]");
  });

  it("resalta el link activo según la ruta '/retries'", () => {
    renderWithRouter("/retries");
    const retriesLink = screen.getByText("🔄 Retries");
    expect(retriesLink).toHaveClass("bg-[#242424]");
  });

  it("resalta el link activo según la ruta '/dead'", () => {
    renderWithRouter("/dead");
    const deadLink = screen.getByText("🧟 Dead");
    expect(deadLink).toHaveClass("bg-[#242424]");
  });
});
