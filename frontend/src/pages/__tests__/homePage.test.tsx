import { it, expect, describe } from "vitest";

import { render, screen } from "@testing-library/react";

import { HomePage } from "../homePage/homePage";
import { BrowserRouter } from "react-router-dom";

describe("HomePage", () => {
  it("should render successfully", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText("Administrador de usuarios")).toBeInTheDocument();
  });
});
